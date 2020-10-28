import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import {
  HistoricalDate,
  HistoricalDateModel,
  ThesaurusEntry,
} from '@myrmidon/cadmus-core';
import {
  CorrDedicationsPart,
  CORR_DEDICATIONS_PART_TYPEID,
} from '../corr-dedications-part';
import { LitDedication } from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * Correspondent's dedications part editor.
 * Thesauri: doc-reference-tags (optional).
 */
@Component({
  selector: 'cadmus-corr-dedications-part',
  templateUrl: './corr-dedications-part.component.html',
  styleUrls: ['./corr-dedications-part.component.css'],
})
export class CorrDedicationsPartComponent
  extends ModelEditorComponentBase<CorrDedicationsPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedDedication: LitDedication;

  public tagEntries: ThesaurusEntry[];

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

  private updateForm(model: CorrDedicationsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.count.setValue(model.dedications?.length || 0);
    this.dedications = model.dedications || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: CorrDedicationsPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    const key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): CorrDedicationsPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: CORR_DEDICATIONS_PART_TYPEID,
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
