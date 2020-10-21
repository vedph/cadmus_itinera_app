import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  MsMaterialDscPart,
  MSMATERIAL_DSC_PART_TYPEID,
} from '../ms-material-dsc-part';
import { MsLocation, MsLocationService, MsPalimpsest } from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * Manuscript's material description.
 * Thesauri: ms-materials, ms-formats, ms-states (all optional).
 */
@Component({
  selector: 'cadmus-ms-material-dsc-part',
  templateUrl: './ms-material-dsc-part.component.html',
  styleUrls: ['./ms-material-dsc-part.component.css'],
})
export class MsMaterialDscPartComponent
  extends ModelEditorComponentBase<MsMaterialDscPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedPalimpsest: MsPalimpsest;

  public material: FormControl;
  public format: FormControl;
  public state: FormControl;
  public stateNote: FormControl;

  public palimpsests: MsPalimpsest[];

  public materialEntries: ThesaurusEntry[];
  public formatEntries: ThesaurusEntry[];
  public stateEntries: ThesaurusEntry[];

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
    this.format = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.state = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.stateNote = formBuilder.control(null, [Validators.maxLength(500)]);
    this.form = formBuilder.group({
      material: this.material,
      format: this.format,
      state: this.state,
      stateNote: this.stateNote,
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
    this.palimpsests = model.palimpsests || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsMaterialDscPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    let key = 'ms-materials';
    if (this.thesauri && this.thesauri[key]) {
      this.materialEntries = this.thesauri[key].entries;
    } else {
      this.materialEntries = null;
    }

    key = 'ms-formats';
    if (this.thesauri && this.thesauri[key]) {
      this.formatEntries = this.thesauri[key].entries;
    } else {
      this.formatEntries = null;
    }

    key = 'ms-states';
    if (this.thesauri && this.thesauri[key]) {
      this.stateEntries = this.thesauri[key].entries;
    } else {
      this.stateEntries = null;
    }
  }

  protected getModelFromForm(): MsMaterialDscPart {
    let part = this.getModelFromJson();
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
    part.palimpsests = this.palimpsests?.length ? this.palimpsests : null;
    return part;
  }

  public addPalimpsest(): void {
    const sheet: MsPalimpsest = {
      location: null,
    };
    this.palimpsests = [...this.palimpsests, sheet];
    this.editPalimpsest(this.palimpsests.length - 1);
  }

  public editPalimpsest(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedPalimpsest = null;
    } else {
      this._editedIndex = index;
      this.editedPalimpsest = this.palimpsests[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onPalimpsestSaved(sheet: MsPalimpsest): void {
    this.palimpsests = this.palimpsests.map((s, i) =>
      i === this._editedIndex ? sheet : s
    );
    this.editPalimpsest(-1);
  }

  public onPalimpsestClosed(): void {
    this.editPalimpsest(-1);
  }

  public deletePalimpsest(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete palimpsest?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const sheets = [...this.palimpsests];
          sheets.splice(index, 1);
          this.palimpsests = sheets;
        }
      });
  }

  public movePalimpsestUp(index: number): void {
    if (index < 1) {
      return;
    }
    const sheet = this.palimpsests[index];
    const sheets = [...this.palimpsests];
    sheets.splice(index, 1);
    sheets.splice(index - 1, 0, sheet);
    this.palimpsests = sheets;
  }

  public movePalimpsestDown(index: number): void {
    if (index + 1 >= this.palimpsests.length) {
      return;
    }
    const sheet = this.palimpsests[index];
    const sheets = [...this.palimpsests];
    sheets.splice(index, 1);
    sheets.splice(index + 1, 0, sheet);
    this.palimpsests = sheets;
  }

  public locationToString(location: MsLocation): string {
    return this._msLocationService.locationToString(location);
  }
}
