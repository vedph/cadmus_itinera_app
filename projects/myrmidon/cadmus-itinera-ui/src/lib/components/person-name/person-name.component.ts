import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Thesaurus } from '@myrmidon/cadmus-core';

@Component({
  selector: 'lib-person-name',
  templateUrl: './person-name.component.html',
  styleUrls: ['./person-name.component.css'],
})
export class PersonNameComponent implements OnInit {
  @Input()
  public parentForm: FormGroup;
  @Input()
  public langThesaurus: Thesaurus;
  @Input()
  public tagThesaurus: Thesaurus;
  @Input()
  public typeThesaurus: Thesaurus;

  public language: FormControl;
  public tag: FormControl;
  public parts: FormArray;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.language = this._formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.tag = this._formBuilder.control(null, Validators.maxLength(50));
    this.parts = this._formBuilder.array([], Validators.required);

    if (!this.parentForm) {
      this.parentForm = this._formBuilder.group({
        language: this.language,
        tag: this.tag,
        parts: this.parts,
      });
    } else {
      this.parentForm.addControl('language', this.language);
      this.parentForm.addControl('tag', this.tag);
      this.parentForm.addControl('parts', this.parts);
    }
  }

  private getPartGroup(id?: string): FormGroup {
    return this._formBuilder.group({
      type: this._formBuilder.control(id, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      value: this._formBuilder.control(id, [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  public addPart(id?: string): void {
    // do not add if falsy or already exists
    if (
      !id ||
      this.parts.controls.some((c: AbstractControl) => {
        return c.value === id;
      })
    ) {
      return;
    }
    this.parts.push(this.getPartGroup(id));
  }

  public addPartBelow(index: number): void {
    this.parts.insert(index + 1, this.getPartGroup());
  }

  public removePart(index: number): void {
    this.parts.removeAt(index);
  }

  public movePartUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.parts.controls[index];
    this.parts.removeAt(index);
    this.parts.insert(index - 1, item);
  }

  public movePartDown(index: number): void {
    if (index + 1 >= this.parts.length) {
      return;
    }
    const item = this.parts.controls[index];
    this.parts.removeAt(index);
    this.parts.insert(index + 1, item);
  }

  public clearParts(): void {
    this.parts.clear();
  }
}
