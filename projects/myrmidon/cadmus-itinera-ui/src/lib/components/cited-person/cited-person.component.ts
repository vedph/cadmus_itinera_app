import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry, DocReference } from '@myrmidon/cadmus-core';
import {
  CitedPerson,
  DecoratedId,
  PersonName,
  PersonNamePart,
} from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'itinera-cited-person',
  templateUrl: './cited-person.component.html',
  styleUrls: ['./cited-person.component.css'],
})
export class CitedPersonComponent implements OnInit {
  public sources: DocReference[];
  public ids: DecoratedId[];

  @Input()
  public person: CitedPerson;

  // languages
  @Input()
  public langEntries: ThesaurusEntry[] | undefined;
  // person-name-tags
  @Input()
  public nameTagEntries: ThesaurusEntry[] | undefined;
  // person-name-types
  @Input()
  public nameTypeEntries: ThesaurusEntry[] | undefined;
  // person-id-tags
  @Input()
  public idTagEntries: ThesaurusEntry[] | undefined;

  @Output()
  public personChange: EventEmitter<CitedPerson>;

  @Output()
  public editorClose: EventEmitter<any>;

  public sources$: BehaviorSubject<DocReference[]>;

  public form: FormGroup;
  public language: FormControl;
  public tag: FormControl;
  public rank: FormControl;
  public parts: FormArray;

  constructor(private _formBuilder: FormBuilder) {
    this.sources$ = new BehaviorSubject<DocReference[]>([]);

    // events
    this.personChange = new EventEmitter<CitedPerson>();
    this.editorClose = new EventEmitter<any>();

    // form
    this.language = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.tag = _formBuilder.control(null, Validators.maxLength(50));
    this.rank = _formBuilder.control(0);
    this.parts = _formBuilder.array([], Validators.required);

    // this is the parent form for both name and ids
    this.form = _formBuilder.group({
      language: this.language,
      tag: this.tag,
      parts: this.parts,
    });
  }

  public ngOnInit(): void {
    this.updateForm(this.person);
  }

  private updateForm(model: CitedPerson): void {
    this.ids = model?.ids || [];
    this.sources$.next(model?.sources || []);

    if (!model) {
      this.form.reset();
    } else {
      this.language.setValue(model.name?.language);
      this.tag.setValue(model.name?.tag);
      this.rank.setValue(model.rank);
      this.parts.clear();
      for (const p of model.name?.parts || []) {
        this.addPart(p);
      }
      this.form.markAsPristine();
    }
  }

  private getName(): PersonName {
    const parts: PersonNamePart[] = [];

    for (let i = 0; i < this.parts.length; i++) {
      const g = this.parts.controls[i] as FormGroup;
      parts.push({
        type: g.controls.type.value,
        value: g.controls.value.value?.trim(),
      });
    }

    return {
      language: this.language.value,
      tag: this.tag.value,
      parts,
    };
  }

  private getModel(): CitedPerson {
    return {
      name: this.getName(),
      rank: this.rank.value,
      ids: this.ids?.length ? this.ids : undefined,
      sources: this.sources?.length ? this.sources : undefined,
    };
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

  public onIdsChange(ids: DecoratedId[]): void {
    this.ids = ids;
    this.form.markAsDirty();
  }

  public onSourcesChange(sources: DocReference[]): void {
    this.sources = sources;
    this.form.markAsDirty();
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    const model = this.getModel();
    this.personChange.emit(model);
  }
}
