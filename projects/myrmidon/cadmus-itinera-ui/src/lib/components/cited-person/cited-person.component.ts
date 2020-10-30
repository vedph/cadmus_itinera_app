import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  CitedPerson,
  DecoratedId,
  DocReference,
  PersonName,
} from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cadmus-cited-person',
  templateUrl: './cited-person.component.html',
  styleUrls: ['./cited-person.component.css'],
})
export class CitedPersonComponent {
  private _person: CitedPerson;
  private _name: PersonName;
  public sources: DocReference[];

  public ids: DecoratedId[];

  @Input()
  public get person(): CitedPerson {
    return this._person;
  }
  public set person(value: CitedPerson) {
    this._person = value;
    this.setModel(this._person);
  }

  /**
   * The optional thesaurus language entries.
   */
  @Input()
  public langEntries: ThesaurusEntry[];
  /**
   * The optional thesaurus name's tag entries.
   */
  @Input()
  public tagEntries: ThesaurusEntry[];
  /**
   * The optional thesaurus name part's type entries.
   */
  @Input()
  public typeEntries: ThesaurusEntry[];

  /**
   * The optional IDs tag entries.
   */
  @Input()
  public idTagEntries: ThesaurusEntry[];

  @Output()
  public personChage: EventEmitter<CitedPerson>;

  @Output()
  public editorClose: EventEmitter<any>;

  public name$: BehaviorSubject<PersonName>;
  public sources$: BehaviorSubject<DocReference[]>;

  public hasName: FormControl;
  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.name$ = new BehaviorSubject<PersonName>({
      language: 'ita',
      parts: [],
    });
    this.sources$ = new BehaviorSubject<DocReference[]>([]);

    // events
    this.personChage = new EventEmitter<CitedPerson>();
    this.editorClose = new EventEmitter<any>();

    // form
    this.hasName = formBuilder.control(false, Validators.requiredTrue);

    // this is the parent form for both name and ids
    this.form = formBuilder.group({
      hasName: this.hasName,
    });
  }

  private setModel(model: CitedPerson): void {
    this.name$.next(model?.name);
    this.ids = model?.ids || [];
    this.sources$.next(model?.sources || []);

    if (!model) {
      this.hasName.setValue(false);
      this.form.reset();
    } else {
      this.hasName.setValue(model?.name?.parts?.length > 0);
      this.form.markAsPristine();
    }
  }

  private getModel(): CitedPerson {
    return {
      name: this._name,
      ids: this.ids?.length ? this.ids : undefined,
      sources: this.sources?.length ? this.sources : undefined,
    };
  }

  public onNameChange(name: PersonName): void {
    this._name = name;
    this.form.markAsDirty();
    this.hasName.setValue(name?.parts?.length > 0);
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
    if (model.name?.language && model.name?.parts?.length > 0) {
      this.personChage.emit(model);
    }
  }
}
