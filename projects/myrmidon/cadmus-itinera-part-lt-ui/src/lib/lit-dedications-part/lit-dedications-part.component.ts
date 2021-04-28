import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import {
  CadmusValidators,
  deepCopy,
  HistoricalDate,
  HistoricalDateModel,
  ThesaurusEntry,
} from '@myrmidon/cadmus-core';
import {
  LitDedicationsPart,
  LIT_DEDICATIONS_PART_TYPEID,
} from '../lit-dedications-part';
import { take } from 'rxjs/operators';
import { LitDedication } from '@myrmidon/cadmus-itinera-core';

/**
 * Correspondent's dedications part editor.
 * Thesauri: doc-reference-tags (optional).
 */
@Component({
  selector: 'itinera-lit-dedications-part',
  templateUrl: './lit-dedications-part.component.html',
  styleUrls: ['./lit-dedications-part.component.css'],
})
export class LitDedicationsPartComponent
  extends ModelEditorComponentBase<LitDedicationsPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedDedication: LitDedication | undefined;
  public dedications: FormControl;

  public tagEntries: ThesaurusEntry[] | undefined;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    // form
    this.dedications = formBuilder.control(
      [],
      CadmusValidators.strictMinLengthValidator(1)
    );
    this.form = formBuilder.group({
      dedications: this.dedications,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: LitDedicationsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.dedications.setValue(model.dedications || []);
    this.form.markAsPristine();
  }

  protected onModelSet(model: LitDedicationsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    const key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): LitDedicationsPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: LIT_DEDICATIONS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        dedications: [],
      };
    }
    part.dedications = this.dedications.value;
    return part;
  }

  private closeDedicationEditor(): void {
    this._editedIndex = -1;
    this.tabIndex = 0;
    this.editedDedication = undefined;
  }

  public addDedication(): void {
    this._editedIndex = -1;
    this.editedDedication = {
      title: null,
    };
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public editDedication(index: number): void {
    this._editedIndex = index;
    this.editedDedication = this.dedications.value[index];
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public onDedicationChange(dedication: LitDedication): void {
    if (this._editedIndex === -1) {
      this.dedications.value.push(dedication);
    } else {
      this.dedications.value.splice(this._editedIndex, 1, dedication);
    }
    this.dedications.updateValueAndValidity();
    this.closeDedicationEditor();
    this.form.markAsDirty();
  }

  public onDedicationClose(): void {
    this.closeDedicationEditor();
  }

  public deleteDedication(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete dedication?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.closeDedicationEditor();
          this.dedications.value.splice(index, 1);
          this.dedications.updateValueAndValidity();
          this.form.markAsDirty();
        }
      });
  }

  public moveDedicationUp(index: number): void {
    if (index < 1) {
      return;
    }
    this.closeDedicationEditor();
    const dedication = this.dedications.value[index];
    const dedications = [...this.dedications.value];
    dedications.splice(index, 1);
    dedications.splice(index - 1, 0, dedication);
    this.dedications.setValue(dedications);
  }

  public moveDedicationDown(index: number): void {
    if (index + 1 >= this.dedications.value.length) {
      return;
    }
    this.closeDedicationEditor();
    const dedication = this.dedications.value[index];
    const dedications = [...this.dedications.value];
    dedications.splice(index, 1);
    dedications.splice(index + 1, 0, dedication);
    this.dedications.setValue(dedications);
  }

  public dateToString(date: HistoricalDateModel): string {
    return date ? new HistoricalDate(date).toString() : '';
  }
}
