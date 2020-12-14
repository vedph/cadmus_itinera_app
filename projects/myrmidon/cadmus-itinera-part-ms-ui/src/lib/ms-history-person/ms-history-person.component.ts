import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HistoricalDateModel, ThesaurusEntry, DocReference } from '@myrmidon/cadmus-core';
import {
  MsHistoryPerson,
  PersonName,
} from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'itinera-ms-history-person',
  templateUrl: './ms-history-person.component.html',
  styleUrls: ['./ms-history-person.component.css'],
})
export class MsHistoryPersonComponent implements OnInit {
  private _ids: string[];
  private _sources: DocReference[];
  public name: PersonName;

  @Input()
  public model: MsHistoryPerson;

  @Input()
  public roleEntries: ThesaurusEntry[];
  // name
  @Input()
  public langEntries: ThesaurusEntry[];
  @Input()
  public nameTypeEntries: ThesaurusEntry[];
  @Input()
  public nameTagEntries: ThesaurusEntry[];

  @Output()
  public modelChange: EventEmitter<MsHistoryPerson>;

  @Output()
  public editorClose: EventEmitter<any>;

  public id: FormControl;
  public role: FormControl;
  public note: FormControl;
  public form: FormGroup;

  public date: HistoricalDateModel;
  public name$: BehaviorSubject<PersonName>;
  public ids$: BehaviorSubject<string[]>;
  public sources$: BehaviorSubject<DocReference[]>;

  constructor(formBuilder: FormBuilder) {
    this.name$ = new BehaviorSubject<PersonName>(null);
    this.ids$ = new BehaviorSubject<string[]>([]);
    this.sources$ = new BehaviorSubject<DocReference[]>([]);
    // events
    this.modelChange = new EventEmitter<MsHistoryPerson>();
    this.editorClose = new EventEmitter();
    // form
    this.id = formBuilder.control(null, Validators.maxLength(50));
    this.role = formBuilder.control(null, Validators.maxLength(50));
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.form = formBuilder.group({
      id: this.id,
      role: this.role,
      note: this.note,
    });
  }

  ngOnInit(): void {
    this.updateForm(this.model);
  }

  private updateForm(model: MsHistoryPerson): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.id.setValue(model.id);
    this.role.setValue(model.role);
    this.note.setValue(model.note);
    this.name$.next(model.name);
    this.ids$.next(model.externalIds || []);
    this.sources$.next(model.sources || []);
    this.form.markAsPristine();
  }

  private getModel(): MsHistoryPerson {
    return {
      id: this.id.value?.trim(),
      role: this.role.value?.trim(),
      note: this.note.value?.trim(),
      name: this.name,
      externalIds: this._ids?.length ? this._ids : undefined,
      sources: this._sources?.length ? this._sources : undefined,
    };
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

  public onNameChanged(name: PersonName): void {
    this.name = name;
    this.form.markAsDirty();
  }

  public onIdsChanged(ids: string[]): void {
    this._ids = ids;
    this.form.markAsDirty();
  }

  public onSourcesChanged(sources: DocReference[]): void {
    this._sources = sources;
    this.form.markAsDirty();
  }
}
