import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Thesaurus } from '@myrmidon/cadmus-core';
import { PersonName, PersonNamePart } from '@myrmidon/cadmus-itinera-core';
import { Observable } from 'rxjs';

/**
 * Person name editor.
 */
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
  @Input()
  public model$: Observable<PersonName>;

  @Output()
  public editorClose: EventEmitter<any>;
  @Output()
  public editorSave: EventEmitter<PersonName>;

  public form: FormGroup;
  public language: FormControl;
  public tag: FormControl;
  public parts: FormArray;

  constructor(private _formBuilder: FormBuilder) {
    // events
    this.editorClose = new EventEmitter<any>();
    this.editorSave = new EventEmitter<PersonName>();

    // handlers
    this.model$?.subscribe((m) => {
      this.setModel(m);
    });
  }

  ngOnInit(): void {
    this.language = this._formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.tag = this._formBuilder.control(null, Validators.maxLength(50));
    this.parts = this._formBuilder.array([], Validators.required);
    this.form = this._formBuilder.group({
      language: this.language,
      tag: this.tag,
      parts: this.parts,
    });

    if (this.parentForm) {
      this.parentForm.addControl('personName', this.form);
    }
  }

  private getPartGroup(part?: PersonNamePart): FormGroup {
    return this._formBuilder.group({
      type: this._formBuilder.control(part?.type, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      value: this._formBuilder.control(part?.value, [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  public addPart(part?: PersonNamePart): void {
    this.parts.push(this.getPartGroup(part));
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

  private setModel(model: PersonName): void {
    if (!model) {
      this.language.reset();
      this.tag.reset();
      this.parts.reset();
    } else {
      this.language.setValue(model.language);
      this.tag.setValue(model.tag);
      this.parts.clear();
      for (const p of model.parts) {
        this.addPart(p);
      }
    }
  }

  private getModel(): PersonName {
    const parts: PersonNamePart[] = [];

    for (let i = 0; i < this.parts.length; i++) {
      const g = this.parts.controls[i] as FormGroup;
      parts.push({
        type: g.controls.type.value,
        value: g.controls.value.value,
      });
    }

    return {
      language: this.language.value,
      tag: this.tag.value,
      parts,
    };
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    const model = this.getModel();
    this.editorSave.emit(model);
  }
}
