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
  PersonName,
  DocReference,
} from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cadmus-cited-person',
  templateUrl: './cited-person.component.html',
  styleUrls: ['./cited-person.component.css'],
})
export class CitedPersonComponent implements OnInit {
  private _name: PersonName;
  private _ids: DecoratedId[];
  private _sources: DocReference[];
  private _model: CitedPerson;

  @Input()
  public get model(): CitedPerson {
    return this._model;
  }
  public set model(value: CitedPerson) {
    this._model = value;
    this.setModel(this._model);
  }

  @Input()
  public tagEntries: ThesaurusEntry[];

  @Output()
  public modelChange: EventEmitter<CitedPerson>;

  @Output()
  public editorClose: EventEmitter<any>;

  public hasName: FormControl;
  public form: FormGroup;

  public name$: BehaviorSubject<PersonName>;
  public ids$: BehaviorSubject<DecoratedId[]>;
  public sources$: BehaviorSubject<DocReference[]>;

  constructor(formBuilder: FormBuilder) {
    this.name$ = new BehaviorSubject<PersonName>(null);
    this.ids$ = new BehaviorSubject<DecoratedId[]>([]);
    this.sources$ = new BehaviorSubject<DocReference[]>([]);
    // events
    this.modelChange = new EventEmitter<CitedPerson>();
    this.editorClose = new EventEmitter();
    // form
    this.hasName = formBuilder.control(false, Validators.requiredTrue);
    this.form = formBuilder.group({
      hasName: this.hasName,
    });
  }

  ngOnInit(): void {}

  private setModel(model: CitedPerson): void {
    if (!model) {
      this.name$.next(null);
      this.ids$.next([]);
      this.sources$.next([]);
      this.form.reset();
      return;
    }
    this.name$.next(model.name);
    this.ids$.next(model.ids || []);
    this.sources$.next(model.sources || []);
    this.hasName.setValue(model.name?.parts?.length > 0);
    this.form.markAsPristine();
  }

  private getModel(): CitedPerson {
    return {
      name: this._name,
      ids: this._ids?.length ? this._ids : undefined,
      sources: this._sources?.length ? this._sources : undefined,
    };
  }

  public onNameChanged(name: PersonName | null): void {
    this._name = name;
    this.hasName.setValue(name?.parts?.length > 0);
    this.form.markAsDirty();
  }

  public onIdsChanged(ids: DecoratedId[] | null): void {
    this._ids = ids;
    this.form.markAsDirty();
  }

  public onSourcesChanged(sources: DocReference[] | null): void {
    this._sources = sources;
    this.form.markAsDirty();
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.modelChange.emit(this.getModel());
  }
}
