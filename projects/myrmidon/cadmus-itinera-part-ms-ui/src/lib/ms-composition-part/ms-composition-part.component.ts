import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';

import {
  MsCompositionPart,
  MSCOMPOSITION_PART_TYPEID,
} from '../ms-composition-part';
import { MsGuardSheet, MsLocation, MsSection } from '@myrmidon/cadmus-itinera-core';
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

  public guardSheets: MsGuardSheet[];
  public editedGuardSheet: MsGuardSheet;

  public sections: MsSection[];
  public editedSection: MsSection;

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
    this.guardSheets = [];
    this.sections = [];
    // form
    this.sheetCount = formBuilder.control(0, Validators.required);
    this.guardSheetCount = formBuilder.control(0);
    this.form = formBuilder.group({
      sheetCount: this.sheetCount,
      guardSheetCount: this.guardSheetCount,
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
    this.guardSheets = model.guardSheets || [];
    this.sections = model.sections || [];
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

  public getLocationText(loc: MsLocation): string {
    return this._msLocationService.locationToString(loc);
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
    part.guardSheets = this.guardSheets;
    part.sections = this.sections;
    return part;
  }

  public addGuardSheet(): void {
    const sheet: MsGuardSheet = {
      isBack: false,
      material: this.materialEntries ? this.materialEntries[0].id : null,
      location: null,
    };
    this.guardSheets = [...this.guardSheets, sheet];
    this.editGuardSheet(this.guardSheets.length - 1);
  }

  public editGuardSheet(index: number): void {
    if (index < 0) {
      this._editedGuardSheetIndex = -1;
      this.tabIndex = 0;
      this.editedGuardSheet = null;
    } else {
      this._editedGuardSheetIndex = index;
      this.editedGuardSheet = this.guardSheets[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onGuardSheetSaved(sheet: MsGuardSheet): void {
    this.guardSheets = this.guardSheets.map((s, i) =>
      i === this._editedGuardSheetIndex ? sheet : s
    );
    this.editGuardSheet(-1);

    // to keep data integrity, increase the count if required
    if ((this.guardSheetCount.value || 0) < this.guardSheets.length) {
      this.guardSheetCount.setValue(this.guardSheets.length);
    }
  }

  public onGuardSheetClosed(): void {
    this.editGuardSheet(-1);
  }

  public deleteGuardSheet(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete guard sheet?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const sheets = [...this.guardSheets];
          sheets.splice(index, 1);
          this.guardSheets = sheets;
        }
      });
  }

  public moveGuardSheetUp(index: number): void {
    if (index < 1) {
      return;
    }
    const sheet = this.guardSheets[index];
    const sheets = [...this.guardSheets];
    sheets.splice(index, 1);
    sheets.splice(index - 1, 0, sheet);
    this.guardSheets = sheets;
  }

  public moveGuardSheetDown(index: number): void {
    if (index + 1 >= this.guardSheets.length) {
      return;
    }
    const sheet = this.guardSheets[index];
    const sheets = [...this.guardSheets];
    sheets.splice(index, 1);
    sheets.splice(index + 1, 0, sheet);
    this.guardSheets = sheets;
  }

  public addSection(): void {
    const section: MsSection = {
      label: null,
      start: null,
      end: null,
    };
    this.sections = [...this.sections, section];
    this.editSection(this.sections.length - 1);
  }

  public editSection(index: number): void {
    if (index < 0) {
      this._editedSectionIndex = -1;
      this.tabIndex = 0;
      this.editedSection = null;
    } else {
      this._editedSectionIndex = index;
      this.editedSection = this.sections[index];
      setTimeout(() => {
        this.tabIndex = 2;
      }, 300);
    }
  }

  public onSectionSaved(sheet: MsSection): void {
    this.sections = this.sections.map((s, i) =>
      i === this._editedSectionIndex ? sheet : s
    );
    this.editSection(-1);
  }

  public onSectionClosed(): void {
    this.editSection(-1);
  }

  public deleteSection(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete guard sheet?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const sheets = [...this.sections];
          sheets.splice(index, 1);
          this.sections = sheets;
        }
      });
  }

  public moveSectionUp(index: number): void {
    if (index < 1) {
      return;
    }
    const sheet = this.sections[index];
    const sheets = [...this.sections];
    sheets.splice(index, 1);
    sheets.splice(index - 1, 0, sheet);
    this.sections = sheets;
  }

  public moveSectionDown(index: number): void {
    if (index + 1 >= this.sections.length) {
      return;
    }
    const sheet = this.sections[index];
    const sheets = [...this.sections];
    sheets.splice(index, 1);
    sheets.splice(index + 1, 0, sheet);
    this.sections = sheets;
  }
}
