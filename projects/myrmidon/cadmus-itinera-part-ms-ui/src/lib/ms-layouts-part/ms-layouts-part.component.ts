import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { DialogService, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  MsLayout,
  MsLayoutsPart,
  MSLAYOUTS_PART_TYPEID,
} from '../ms-layouts-part';
import { MsLocation, MsLocationService } from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * Manuscript's layouts part.
 * Thesauri: physical-size-units; optional: ms-dimensions, ms-counts,
 * ms-ruling-techniques (all optional).
 */
@Component({
  selector: 'itinera-ms-layouts-part',
  templateUrl: './ms-layouts-part.component.html',
  styleUrls: ['./ms-layouts-part.component.css'],
})
export class MsLayoutsPartComponent
  extends ModelEditorComponentBase<MsLayoutsPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedLayout: MsLayout | undefined;

  public layouts: FormControl;

  public countEntries: ThesaurusEntry[] | undefined;
  public dimEntries: ThesaurusEntry[] | undefined;
  public rulingEntries: ThesaurusEntry[] | undefined;
  public unitEntries: ThesaurusEntry[] | undefined;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _locService: MsLocationService,
    private _dialogService: DialogService
  ) {
    super(authService);
    this._editedIndex = -1;
    this.tabIndex = 0;
    // form
    this.layouts = formBuilder.control([], Validators.required);
    this.form = formBuilder.group({
      entries: this.layouts,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsLayoutsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.layouts.setValue(model.layouts || []);
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsLayoutsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'physical-size-units';
    if (this.thesauri && this.thesauri[key]) {
      this.unitEntries = this.thesauri[key].entries;
    } else {
      this.unitEntries = undefined;
    }

    key = 'ms-dimensions';
    if (this.thesauri && this.thesauri[key]) {
      this.dimEntries = this.thesauri[key].entries;
    } else {
      this.dimEntries = undefined;
    }

    key = 'ms-ruling-techniques';
    if (this.thesauri && this.thesauri[key]) {
      this.rulingEntries = this.thesauri[key].entries;
    } else {
      this.rulingEntries = undefined;
    }

    key = 'ms-counts';
    if (this.thesauri && this.thesauri[key]) {
      this.countEntries = this.thesauri[key].entries;
    } else {
      this.countEntries = undefined;
    }
  }

  protected getModelFromForm(): MsLayoutsPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSLAYOUTS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        layouts: [],
      };
    }
    part.entries = this.layouts.value || [];
    return part;
  }

  public addLayout(): void {
    const unit: MsLayout = {
      sample: null,
      columnCount: 0
    };
    this.layouts.setValue([...this.layouts.value, unit]);
    this.editLayout(this.layouts.value.length - 1);
  }

  public editLayout(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedLayout = undefined;
    } else {
      this._editedIndex = index;
      this.editedLayout = this.layouts.value[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onLayoutSave(entry: MsLayout): void {
    this.layouts.setValue(
      this.layouts.value.map((e: MsLayout, i: number) =>
        i === this._editedIndex ? entry : e
      )
    );
    this.editLayout(-1);
  }

  public onLayoutClose(): void {
    this.editLayout(-1);
  }

  public deleteLayout(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete layout?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const entries = [...this.layouts.value];
          entries.splice(index, 1);
          this.layouts.setValue(entries);
        }
      });
  }

  public moveLayoutUp(index: number): void {
    if (index < 1) {
      return;
    }
    const entry = this.layouts.value[index];
    const entries = [...this.layouts.value];
    entries.splice(index, 1);
    entries.splice(index - 1, 0, entry);
    this.layouts.setValue(entries);
  }

  public moveLayoutDown(index: number): void {
    if (index + 1 >= this.layouts.value.length) {
      return;
    }
    const entry = this.layouts.value[index];
    const entries = [...this.layouts.value];
    entries.splice(index, 1);
    entries.splice(index + 1, 0, entry);
    this.layouts.setValue(entries);
  }

  public locationToString(location: MsLocation | undefined): string {
    return this._locService.locationToString(location);
  }
}
