import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
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
  selector: 'cadmus-ms-watermarks-part',
  templateUrl: './ms-watermarks-part.component.html',
  styleUrls: ['./ms-watermarks-part.component.css'],
})
export class MsWatermarksPartComponent
  extends ModelEditorComponentBase<MsWatermarksPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedWatermark: MsWatermark;

  public subjectEntries: ThesaurusEntry[];

  public watermarks: MsWatermark[];

  public count: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    this.watermarks = [];
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
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
    this.count.setValue(model.watermarks?.length || 0);
    this.watermarks = model.watermarks || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsWatermarksPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    const key = 'ms-watermark-subjects';
    if (this.thesauri && this.thesauri[key]) {
      this.subjectEntries = this.thesauri[key].entries;
    } else {
      this.subjectEntries = null;
    }
  }

  protected getModelFromForm(): MsWatermarksPart {
    let part = this.getModelFromJson();
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
    part.watermarks = this.watermarks;
    return part;
  }

  public addWatermark(): void {
    const sheet: MsWatermark = {
      subject: null,
    };
    this.watermarks = [...this.watermarks, sheet];
    this.count.setValue(this.watermarks.length);
    this.count.markAsDirty();
    this.editWatermark(this.watermarks.length - 1);
  }

  public editWatermark(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedWatermark = null;
    } else {
      this._editedIndex = index;
      this.editedWatermark = this.watermarks[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onWatermarkSaved(sheet: MsWatermark): void {
    this.watermarks = this.watermarks.map((s, i) =>
      i === this._editedIndex ? sheet : s
    );
    this.editWatermark(-1);
    this.count.markAsDirty();
  }

  public onWatermarkClosed(): void {
    this.editWatermark(-1);
  }

  public deleteWatermark(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete watermark?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const sheets = [...this.watermarks];
          sheets.splice(index, 1);
          this.watermarks = sheets;
          this.count.setValue(this.watermarks.length);
          this.count.markAsDirty();
        }
      });
  }

  public moveWatermarkUp(index: number): void {
    if (index < 1) {
      return;
    }
    const sheet = this.watermarks[index];
    const sheets = [...this.watermarks];
    sheets.splice(index, 1);
    sheets.splice(index - 1, 0, sheet);
    this.watermarks = sheets;
    this.form.markAsDirty();
  }

  public moveWatermarkDown(index: number): void {
    if (index + 1 >= this.watermarks.length) {
      return;
    }
    const sheet = this.watermarks[index];
    const sheets = [...this.watermarks];
    sheets.splice(index, 1);
    sheets.splice(index + 1, 0, sheet);
    this.watermarks = sheets;
    this.form.markAsDirty();
  }
}
