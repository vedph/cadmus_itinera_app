import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';

import {
  MsCompositionPart,
  MSCOMPOSITION_PART_TYPEID,
} from '../ms-composition-part';
import {
  MsGuardSheet,
  MsLocation,
  MsLocationRange,
  MsSection,
} from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';
import { MsLocationService } from '@myrmidon/cadmus-itinera-core';

/**
 * Manuscript's composition.
 * Thesauri: ms-materials (all optional).
 */
@Component({
  selector: 'itinera-ms-composition-part',
  templateUrl: './ms-composition-part.component.html',
  styleUrls: ['./ms-composition-part.component.css'],
})
export class MsCompositionPartComponent
  extends ModelEditorComponentBase<MsCompositionPart>
  implements OnInit {
  private _editedGuardSheetIndex: number;
  private _editedSectionIndex: number;

  public tabIndex: number;

  public sheetCount: FormControl;
  public guardSheetCount: FormControl;
  public guardSheets: FormControl;
  public sections: FormControl;

  public editedGuardSheet: MsGuardSheet | undefined;
  public editedSection: MsSection | undefined;

  public materialEntries: ThesaurusEntry[] | undefined;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _msLocationService: MsLocationService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedGuardSheetIndex = -1;
    this._editedSectionIndex = -1;
    // form
    this.sheetCount = formBuilder.control(0, Validators.required);
    this.guardSheetCount = formBuilder.control(0);
    this.guardSheets = formBuilder.control([]);
    this.sections = formBuilder.control([]);
    this.form = formBuilder.group({
      sheetCount: this.sheetCount,
      guardSheetCount: this.guardSheetCount,
      guardSheets: this.guardSheets,
      sections: this.sections,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsCompositionPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.sheetCount.setValue(model.sheetCount || 0);
    this.guardSheetCount.setValue(model.guardSheetCount || 0);
    this.guardSheets.setValue(model.guardSheets || []);
    this.sections.setValue(model.sections || []);
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsCompositionPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    const key = 'ms-materials';
    if (this.thesauri && this.thesauri[key]) {
      this.materialEntries = this.thesauri[key].entries;
    } else {
      this.materialEntries = null;
    }
  }

  public rangeToString(range: MsLocationRange): string {
    return this._msLocationService.rangeToString(range);
  }

  protected getModelFromForm(): MsCompositionPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSCOMPOSITION_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        sheetCount: 0,
      };
    }
    part.sheetCount = this.sheetCount.value;
    part.guardSheetCount = this.guardSheetCount.value;
    part.guardSheets = this.guardSheets.value?.length
      ? this.guardSheets.value
      : undefined;
    part.sections = this.sections.value?.length
      ? this.sections.value
      : undefined;
    return part;
  }

  public addGuardSheet(): void {
    this._editedGuardSheetIndex = -1;
    this.editedGuardSheet = {
      isBack: false,
      material: this.materialEntries ? this.materialEntries[0].id : null,
      range: null,
    };
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  private closeGuardSheetEditor(): void {
    this._editedGuardSheetIndex = -1;
    this.tabIndex = 0;
    this.editedGuardSheet = undefined;
  }

  public editGuardSheet(index: number): void {
    this._editedGuardSheetIndex = index;
    this.editedGuardSheet = this.guardSheets.value[index];
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public onGuardSheetSaved(sheet: MsGuardSheet): void {
    if (this._editedGuardSheetIndex === -1) {
      this.guardSheets.value.push(sheet);
    } else {
      this.guardSheets.value.splice(this._editedGuardSheetIndex, 1, sheet);
    }
    this.closeGuardSheetEditor();

    // to keep data integrity, increase the count if required
    if ((this.guardSheetCount.value || 0) < this.guardSheets.value?.length) {
      this.guardSheetCount.setValue(this.guardSheets.value.length);
    }

    this.form.markAsDirty();
  }

  public onGuardSheetClosed(): void {
    this.closeGuardSheetEditor();
  }

  public deleteGuardSheet(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete guard sheet?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.guardSheets.value.splice(index, 1);
          this.form.markAsDirty();
        }
      });
  }

  public moveGuardSheetUp(index: number): void {
    if (index < 1) {
      return;
    }
    const sheet = this.guardSheets.value[index];
    const sheets = [...this.guardSheets.value];
    sheets.splice(index, 1);
    sheets.splice(index - 1, 0, sheet);
    this.guardSheets.setValue(sheets);
    this.form.markAsDirty();
  }

  public moveGuardSheetDown(index: number): void {
    if (index + 1 >= this.guardSheets.value.length) {
      return;
    }
    const sheet = this.guardSheets.value[index];
    const sheets = [...this.guardSheets.value];
    sheets.splice(index, 1);
    sheets.splice(index + 1, 0, sheet);
    this.guardSheets.setValue(sheets);
    this.form.markAsDirty();
  }

  public addSection(): void {
    this._editedSectionIndex = -1;
    this.editedSection = {
      label: null,
      start: null,
      end: null,
    };
    setTimeout(() => {
      this.tabIndex = 2;
    }, 300);
  }

  private closeSectionEditor(): void {
    this._editedSectionIndex = -1;
    this.editedSection = undefined;
    this.tabIndex = 0;
  }

  public editSection(index: number): void {
    this._editedSectionIndex = index;
    this.editedSection = this.sections.value[index];
    setTimeout(() => {
      this.tabIndex = 2;
    }, 300);
  }

  public onSectionSaved(section: MsSection): void {
    if (this._editedSectionIndex === -1) {
      this.sections.value.push(section);
    } else {
      this.sections.value.splice(this._editedSectionIndex, 1, section);
    }
    this.closeSectionEditor();
    this.form.markAsDirty();
  }

  public onSectionClosed(): void {
    this.closeSectionEditor();
  }

  public deleteSection(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete guard sheet?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.sections.value.splice(index, 1);
          this.form.markAsDirty();
        }
      });
  }

  public moveSectionUp(index: number): void {
    if (index < 1) {
      return;
    }
    const section = this.sections.value[index];
    const sections = [...this.sections.value];
    sections.splice(index, 1);
    sections.splice(index - 1, 0, section);
    this.sections.setValue(sections);
  }

  public moveSectionDown(index: number): void {
    if (index + 1 >= this.sections.value.length) {
      return;
    }
    const section = this.sections.value[index];
    const sections = [...this.sections.value];
    sections.splice(index, 1);
    sections.splice(index + 1, 0, section);
    this.sections.setValue(sections);
  }
}
