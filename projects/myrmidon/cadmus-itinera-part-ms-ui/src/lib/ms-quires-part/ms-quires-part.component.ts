import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { MsQuiresPart, MSQUIRES_PART_TYPEID } from '../ms-quires-part';
import { MsQuire, MsQuiresService } from '@myrmidon/cadmus-itinera-core';
import { deepCopy } from '@myrmidon/cadmus-core';

/**
 * Manuscript's quires part.
 * Thesauri: none.
 */
@Component({
  selector: 'itinera-ms-quires-part',
  templateUrl: './ms-quires-part.component.html',
  styleUrls: ['./ms-quires-part.component.css'],
})
export class MsQuiresPartComponent
  extends ModelEditorComponentBase<MsQuiresPart>
  implements OnInit {
  public formula: FormControl;
  public quires: FormArray;

  constructor(
    authService: AuthService,
    private _formBuilder: FormBuilder,
    private _msQuiresService: MsQuiresService
  ) {
    super(authService);
    // form
    this.formula = _formBuilder.control(null);
    this.quires = _formBuilder.array([], Validators.required);
    this.form = _formBuilder.group({
      formula: this.formula,
      quires: this.quires,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsQuiresPart): void {
    if (!model?.quires?.length) {
      this.form.reset();
      return;
    }
    this.quires.clear();
    for (const quire of model.quires) {
      this.addQuire(quire);
    }
    this.formula.setValue(this._msQuiresService.quiresToString(model.quires));
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsQuiresPart): void {
    this.updateForm(deepCopy(model));
  }

  private getQuireFromGroup(group: FormGroup): MsQuire {
    return {
      tag: group.controls.tag.value,
      startNr: group.controls.startNr.value,
      endNr: group.controls.endNr.value,
      sheetCount: group.controls.sheetCount.value,
      sheetDelta: group.controls.sheetDelta.value,
      note: group.controls.note.value?.trim(),
    };
  }

  protected getModelFromForm(): MsQuiresPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSQUIRES_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        quires: [],
      };
    }
    part.quires = [];
    for (let i = 0; i < this.quires.length; i++) {
      const g = this.quires.controls[i] as FormGroup;
      part.quires.push(this.getQuireFromGroup(g));
    }
    return part;
  }

  private getQuireGroup(quire?: MsQuire): FormGroup {
    return this._formBuilder.group({
      tag: this._formBuilder.control(quire?.tag, Validators.maxLength(50)),
      startNr: this._formBuilder.control(
        quire ? quire.startNr : 0,
        Validators.required
      ),
      endNr: this._formBuilder.control(
        quire ? quire.endNr : 0,
        Validators.required
      ),
      sheetCount: this._formBuilder.control(
        quire ? quire.sheetCount : 0,
        Validators.required
      ),
      sheetDelta: this._formBuilder.control(quire?.sheetDelta || 0),
      note: this._formBuilder.control(quire?.note, Validators.maxLength(100)),
    });
  }

  public addQuire(item?: MsQuire): void {
    this.quires.push(this.getQuireGroup(item));
  }

  public removeQuire(index: number): void {
    this.quires.removeAt(index);
  }

  public moveQuireUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.quires.controls[index];
    this.quires.removeAt(index);
    this.quires.insert(index - 1, item);
  }

  public moveQuireDown(index: number): void {
    if (index + 1 >= this.quires.length) {
      return;
    }
    const item = this.quires.controls[index];
    this.quires.removeAt(index);
    this.quires.insert(index + 1, item);
  }

  public applyFormula(): void {
    const quires = this._msQuiresService.parseQuires(this.formula.value);
    this.quires.clear();
    for (const quire of quires) {
      this.addQuire(quire);
    }
  }

  public setFormula(): void {
    if (!this.quires.length) {
      this.formula.reset();
      return;
    }
    const quires: MsQuire[] = [];
    for (let i = 0; i < this.quires.length; i++) {
      const g = this.quires.controls[i] as FormGroup;
      quires.push(this.getQuireFromGroup(g));
    }
    this.formula.setValue(this._msQuiresService.quiresToString(quires));
  }
}
