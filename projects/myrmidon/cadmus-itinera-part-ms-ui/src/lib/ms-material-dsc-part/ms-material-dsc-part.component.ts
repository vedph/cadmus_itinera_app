import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  MsMaterialDscPart,
  MSMATERIAL_DSC_PART_TYPEID,
} from '../ms-material-dsc-part';
import {
  MsLocation,
  MsLocationService,
  MsPalimpsest,
} from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * Manuscript's material description.
 * Thesauri: ms-materials, ms-formats, ms-states (all optional).
 */
@Component({
  selector: 'itinera-ms-material-dsc-part',
  templateUrl: './ms-material-dsc-part.component.html',
  styleUrls: ['./ms-material-dsc-part.component.css'],
})
export class MsMaterialDscPartComponent
  extends ModelEditorComponentBase<MsMaterialDscPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedPalimpsest: MsPalimpsest | undefined;

  public material: FormControl;
  public format: FormControl;
  public state: FormControl;
  public stateNote: FormControl;
  public palimpsests: FormControl;

  public materialEntries: ThesaurusEntry[] | undefined;
  public formatEntries: ThesaurusEntry[] | undefined;
  public stateEntries: ThesaurusEntry[] | undefined;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _msLocationService: MsLocationService
  ) {
    super(authService);
    this._editedIndex = -1;
    this.tabIndex = 0;
    // form
    this.material = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.format = formBuilder.control(null, Validators.maxLength(50));
    this.state = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.stateNote = formBuilder.control(null, [Validators.maxLength(500)]);
    this.palimpsests = formBuilder.control([]);
    this.form = formBuilder.group({
      material: this.material,
      format: this.format,
      state: this.state,
      stateNote: this.stateNote,
      palimpsests: this.palimpsests,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsMaterialDscPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.material.setValue(model.material);
    this.format.setValue(model.format);
    this.state.setValue(model.state);
    this.stateNote.setValue(model.stateNote);
    this.palimpsests.setValue(model.palimpsests || []);
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsMaterialDscPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'ms-materials';
    if (this.thesauri && this.thesauri[key]) {
      this.materialEntries = this.thesauri[key].entries;
    } else {
      this.materialEntries = undefined;
    }

    key = 'ms-formats';
    if (this.thesauri && this.thesauri[key]) {
      this.formatEntries = this.thesauri[key].entries;
    } else {
      this.formatEntries = undefined;
    }

    key = 'ms-states';
    if (this.thesauri && this.thesauri[key]) {
      this.stateEntries = this.thesauri[key].entries;
    } else {
      this.stateEntries = undefined;
    }
  }

  protected getModelFromForm(): MsMaterialDscPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSMATERIAL_DSC_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        material: null,
        format: null,
        state: null,
      };
    }
    part.material = this.material.value?.trim();
    part.format = this.format.value?.trim();
    part.state = this.state.value?.trim();
    part.stateNote = this.stateNote.value?.trim();
    part.palimpsests = this.palimpsests.value?.length
      ? this.palimpsests.value
      : null;
    return part;
  }

  public addPalimpsest(): void {
    this._editedIndex = -1;
    this.editedPalimpsest = {
      location: null,
    };
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public closePalimpsestEditor(): void {
    this._editedIndex = -1;
    this.tabIndex = 0;
    this.editedPalimpsest = undefined;
  }

  public editPalimpsest(index: number): void {
    this._editedIndex = index;
    this.editedPalimpsest = this.palimpsests.value[index];
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public onPalimpsestChange(palimpsest: MsPalimpsest): void {
    const palimpsests = this.palimpsests.value;
    if (this._editedIndex === -1) {
      palimpsests.push(palimpsest);
    } else {
      palimpsests.splice(this._editedIndex, 1, palimpsest);
    }
    this.palimpsests.setValue(palimpsests);
    this.closePalimpsestEditor();
    this.form.markAsDirty();
  }

  public onPalimpsestClose(): void {
    this.closePalimpsestEditor();
  }

  public deletePalimpsest(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete palimpsest?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.palimpsests.value.splice(index, 1);
          this.form.markAsDirty();
        }
      });
  }

  public movePalimpsestUp(index: number): void {
    if (index < 1) {
      return;
    }
    const sheet = this.palimpsests.value[index];
    const sheets = [...this.palimpsests.value];
    sheets.splice(index, 1);
    sheets.splice(index - 1, 0, sheet);
    this.palimpsests.setValue(sheets);
    this.form.markAsDirty();
  }

  public movePalimpsestDown(index: number): void {
    if (index + 1 >= this.palimpsests.value.length) {
      return;
    }
    const sheet = this.palimpsests.value[index];
    const sheets = [...this.palimpsests.value];
    sheets.splice(index, 1);
    sheets.splice(index + 1, 0, sheet);
    this.palimpsests.setValue(sheets);
    this.form.markAsDirty();
  }

  public locationToString(location: MsLocation): string {
    return this._msLocationService.locationToString(location);
  }
}
