import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import {
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
  public editedDedication: LitDedication;

  public tagEntries: ThesaurusEntry[] | undefined;

  public dedications: LitDedication[];

  public count: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    this.dedications = [];
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
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
    this.count.setValue(model.dedications?.length || 0);
    this.dedications = model.dedications || [];
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
    part.dedications = this.dedications;
    return part;
  }

  public addDedication(): void {
    const dedication: LitDedication = {
      title: null,
    };
    this.dedications = [...this.dedications, dedication];
    this.count.setValue(this.dedications.length);
    this.count.markAsDirty();
    this.editDedication(this.dedications.length - 1);
  }

  public editDedication(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedDedication = null;
    } else {
      this._editedIndex = index;
      this.editedDedication = this.dedications[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onDedicationSaved(item: LitDedication): void {
    this.dedications = this.dedications.map((s, i) =>
      i === this._editedIndex ? item : s
    );
    this.editDedication(-1);
    this.count.markAsDirty();
  }

  public onDedicationClosed(): void {
    this.editDedication(-1);
  }

  public deleteDedication(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete dedication?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const dedications = [...this.dedications];
          dedications.splice(index, 1);
          this.dedications = dedications;
          this.count.setValue(this.dedications.length);
          this.count.markAsDirty();
        }
      });
  }

  public moveDedicationUp(index: number): void {
    if (index < 1) {
      return;
    }
    const dedication = this.dedications[index];
    const dedications = [...this.dedications];
    dedications.splice(index, 1);
    dedications.splice(index - 1, 0, dedication);
    this.dedications = dedications;
  }

  public moveDedicationDown(index: number): void {
    if (index + 1 >= this.dedications.length) {
      return;
    }
    const dedication = this.dedications[index];
    const dedications = [...this.dedications];
    dedications.splice(index, 1);
    dedications.splice(index + 1, 0, dedication);
    this.dedications = dedications;
  }

  public dateToString(date: HistoricalDateModel): string {
    return date ? new HistoricalDate(date).toString() : '';
  }
}
