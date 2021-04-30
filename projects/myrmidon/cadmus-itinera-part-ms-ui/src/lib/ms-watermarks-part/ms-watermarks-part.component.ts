import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@myrmidon/cadmus-api';
import { CadmusValidators, deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsWatermark } from '@myrmidon/cadmus-itinera-core';
import { DialogService, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { take } from 'rxjs/operators';

import {
  MsWatermarksPart,
  MSWATERMARKS_PART_TYPEID,
} from '../ms-watermarks-part';

/**
 * Manuscript's watermarks.
 * Thesauri: ms-watermark-subjects (optional).
 */
@Component({
  selector: 'itinera-ms-watermarks-part',
  templateUrl: './ms-watermarks-part.component.html',
  styleUrls: ['./ms-watermarks-part.component.css'],
})
export class MsWatermarksPartComponent
  extends ModelEditorComponentBase<MsWatermarksPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedWatermark: MsWatermark | undefined;

  public watermarks: FormControl;

  public subjectEntries: ThesaurusEntry[] | undefined;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    // form
    this.watermarks = formBuilder.control([],
      CadmusValidators.strictMinLengthValidator(1));
    this.form = formBuilder.group({
      watermarks: this.watermarks,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsWatermarksPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.watermarks.setValue(model.watermarks || []);
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsWatermarksPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    const key = 'ms-watermark-subjects';
    if (this.thesauri && this.thesauri[key]) {
      this.subjectEntries = this.thesauri[key].entries;
    } else {
      this.subjectEntries = undefined;
    }
  }

  protected getModelFromForm(): MsWatermarksPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSWATERMARKS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        watermarks: [],
      };
    }
    part.watermarks = this.watermarks.value;
    return part;
  }

  private closeWatermarkEditor(): void {
    this._editedIndex = -1;
    this.tabIndex = 0;
    this.editedWatermark = undefined;
  }

  public addWatermark(): void {
    this._editedIndex = -1;
    this.editedWatermark = {
      subject: null,
    };
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public editWatermark(index: number): void {
    this._editedIndex = index;
    this.editedWatermark = this.watermarks.value[index];
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public onWatermarkChange(watermark: MsWatermark): void {
    if (this._editedIndex === -1) {
      this.watermarks.value.push(watermark);
    } else {
      this.watermarks.value.splice(this._editedIndex, 1, watermark);
    }
    this.closeWatermarkEditor();
    this.watermarks.updateValueAndValidity();
    this.form.markAsDirty();
  }

  public onWatermarkClose(): void {
    this.closeWatermarkEditor();
  }

  public deleteWatermark(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete watermark?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.closeWatermarkEditor();
          this.watermarks.value.splice(index, 1);
          this.watermarks.updateValueAndValidity();
          this.form.markAsDirty();
        }
      });
  }

  public moveWatermarkUp(index: number): void {
    if (index < 1) {
      return;
    }
    this.closeWatermarkEditor();
    const watermark = this.watermarks.value[index];
    const watermarks = [...this.watermarks.value];
    watermarks.splice(index, 1);
    watermarks.splice(index - 1, 0, watermark);
    this.watermarks.setValue(watermarks);
    this.form.markAsDirty();
  }

  public moveWatermarkDown(index: number): void {
    if (index + 1 >= this.watermarks.value.length) {
      return;
    }
    this.closeWatermarkEditor();
    const watermark = this.watermarks.value[index];
    const watermarks = [...this.watermarks.value];
    watermarks.splice(index, 1);
    watermarks.splice(index + 1, 0, watermark);
    this.watermarks.setValue(watermarks);
    this.form.markAsDirty();
  }
}
