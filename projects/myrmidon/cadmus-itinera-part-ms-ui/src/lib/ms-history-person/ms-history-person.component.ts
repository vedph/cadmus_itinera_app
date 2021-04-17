import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  HistoricalDateModel,
  ThesaurusEntry,
  DocReference,
} from '@myrmidon/cadmus-core';
import { MsHistoryPerson, PersonName } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-ms-history-person',
  templateUrl: './ms-history-person.component.html',
  styleUrls: ['./ms-history-person.component.css'],
})
export class MsHistoryPersonComponent implements OnInit {
  @Input()
  public model: MsHistoryPerson;

  // doc-reference-tags
  @Input()
  public docRefTagEntries: ThesaurusEntry[] | undefined;
  @Input()
  public roleEntries: ThesaurusEntry[] | undefined;
  // name
  @Input()
  public langEntries: ThesaurusEntry[] | undefined;
  @Input()
  public nameTypeEntries: ThesaurusEntry[] | undefined;
  @Input()
  public nameTagEntries: ThesaurusEntry[] | undefined;

  @Output()
  public modelChange: EventEmitter<MsHistoryPerson>;

  @Output()
  public editorClose: EventEmitter<any>;

  public id: FormControl;
  public role: FormControl;
  public note: FormControl;
  public ids: FormControl;
  public sources: FormControl;
  public name: FormControl;
  public form: FormGroup;

  public initialIds: string[];
  public initialSources: DocReference[];
  public initialName: PersonName | undefined;

  public date: HistoricalDateModel | undefined;

  constructor(formBuilder: FormBuilder) {
    this.initialIds = [];
    this.initialSources = [];
    // events
    this.modelChange = new EventEmitter<MsHistoryPerson>();
    this.editorClose = new EventEmitter();
    // form
    this.id = formBuilder.control(null, Validators.maxLength(50));
    this.role = formBuilder.control(null, Validators.maxLength(50));
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.ids = formBuilder.control([]);
    this.sources = formBuilder.control([]);
    this.name = formBuilder.control(null, Validators.required);
    this.form = formBuilder.group({
      id: this.id,
      role: this.role,
      note: this.note,
      ids: this.ids,
      sources: this.sources,
      name: this.name,
    });
  }

  ngOnInit(): void {
    this.updateForm(this.model);
  }

  private updateForm(model: MsHistoryPerson): void {
    if (!model) {
      this.initialIds = [];
      this.initialSources = [];
      this.initialName = undefined;
      this.form.reset();
      return;
    }
    this.id.setValue(model.id);
    this.role.setValue(model.role);
    this.note.setValue(model.note);
    this.initialName = model.name;
    this.initialIds = model.externalIds || [];
    this.initialSources = model.sources || [];
    this.form.markAsPristine();
  }

  private getModel(): MsHistoryPerson {
    return {
      id: this.id.value?.trim(),
      role: this.role.value?.trim(),
      note: this.note.value?.trim(),
      name: this.name.value,
      externalIds: this.ids.value?.length ? this.ids.value : undefined,
      sources: this.sources.value?.length ? this.sources.value : undefined,
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

  public onNameChange(name: PersonName): void {
    this.name.setValue(name);
    this.form.markAsDirty();
  }

  public onIdsChange(ids: string[]): void {
    this.ids.setValue(ids);
    this.form.markAsDirty();
  }

  public onSourcesChange(sources: DocReference[]): void {
    this.sources.setValue(sources);
    this.form.markAsDirty();
  }
}
