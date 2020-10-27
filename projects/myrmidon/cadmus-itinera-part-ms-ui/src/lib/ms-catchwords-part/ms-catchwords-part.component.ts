import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  MsCatchwordsPart,
  MSCATCHWORDS_PART_TYPEID,
} from '../ms-catchwords-part';
import { MsCatchword } from '@myrmidon/cadmus-itinera-core';

/**
 * Manuscript's catchwords part editor.
 * Thesauri: ms-catchword-positions (optional).
 */
@Component({
  selector: 'cadmus-ms-catchwords-part',
  templateUrl: './ms-catchwords-part.component.html',
  styleUrls: ['./ms-catchwords-part.component.css'],
})
export class MsCatchwordsPartComponent
  extends ModelEditorComponentBase<MsCatchwordsPart>
  implements OnInit {
  public catchwords: FormArray;

  public posEntries: ThesaurusEntry[];

  constructor(authService: AuthService, private _formBuilder: FormBuilder) {
    super(authService);
    // form
    this.catchwords = _formBuilder.array([], Validators.required);
    this.form = _formBuilder.group({
      catchwords: this.catchwords,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsCatchwordsPart): void {
    if (!model?.catchwords?.length) {
      this.form.reset();
      return;
    }
    this.catchwords.clear();
    for (const catchword of model.catchwords) {
      this.addCatchword(catchword);
    }
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsCatchwordsPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    const key = 'ms-catchword-positions';
    if (this.thesauri && this.thesauri[key]) {
      this.posEntries = this.thesauri[key].entries;
    } else {
      this.posEntries = null;
    }
  }

  protected getModelFromForm(): MsCatchwordsPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSCATCHWORDS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        catchwords: [],
      };
    } else {
      part.catchwords = [];
    }
    for (let i = 0; i < this.catchwords.length; i++) {
      const g = this.catchwords.controls[i] as FormGroup;
      part.catchwords.push({
        position: g.controls.position.value?.trim(),
        isVertical: g.controls.isVertical.value || false,
        decoration: g.controls.decoration.value?.trim(),
        register: g.controls.register.value?.trim(),
        note: g.controls.note.value?.trim(),
      });
    }
    return part;
  }

  private getCatchwordGroup(catchword?: MsCatchword): FormGroup {
    return this._formBuilder.group({
      position: this._formBuilder.control(
        catchword?.position,
        Validators.required
      ),
      isVertical: this._formBuilder.control(catchword?.isVertical || false),
      decoration: this._formBuilder.control(
        catchword?.decoration,
        Validators.maxLength(500)
      ),
      register: this._formBuilder.control(
        catchword?.register,
        Validators.maxLength(500)
      ),
      note: this._formBuilder.control(
        catchword?.note,
        Validators.maxLength(500)
      ),
    });
  }

  public addCatchword(catchword?: MsCatchword): void {
    this.catchwords.push(this.getCatchwordGroup(catchword));
  }

  public removeCatchword(index: number): void {
    this.catchwords.removeAt(index);
  }

  public moveCatchwordUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.catchwords.controls[index];
    this.catchwords.removeAt(index);
    this.catchwords.insert(index - 1, item);
  }

  public moveCatchwordDown(index: number): void {
    if (index + 1 >= this.catchwords.length) {
      return;
    }
    const item = this.catchwords.controls[index];
    this.catchwords.removeAt(index);
    this.catchwords.insert(index + 1, item);
  }
}
