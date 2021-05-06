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
import { DecoratedId, LitDedication } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-lit-dedication',
  templateUrl: './lit-dedication.component.html',
  styleUrls: ['./lit-dedication.component.css'],
})
export class LitDedicationComponent implements OnInit {
  private _dedication: LitDedication | undefined;

  @Input()
  public get dedication(): LitDedication | undefined {
    return this._dedication;
  }
  public set dedication(value: LitDedication | undefined) {
    this._dedication = value;
    this.updateForm(value);
  }

  @Input()
  public tagEntries: ThesaurusEntry[] | undefined;

  @Output()
  public dedicationChange: EventEmitter<LitDedication>;

  @Output()
  public editorClose: EventEmitter<any>;

  public title: FormControl;
  public hasDate: FormControl;
  public hasDateSent: FormControl;
  public sources: FormControl;
  public form: FormGroup;

  public date: HistoricalDateModel;
  public dateSent: HistoricalDateModel;
  public participants: DecoratedId[] | undefined;
  public initialParticipants: DecoratedId[];
  public initialSources: DocReference[];

  constructor(formBuilder: FormBuilder) {
    this.initialParticipants = [];
    this.initialSources = [];
    // events
    this.dedicationChange = new EventEmitter<LitDedication>();
    this.editorClose = new EventEmitter();
    // form
    this.title = formBuilder.control(null, [
      Validators.maxLength(100),
    ]);
    this.participants = [];
    this.hasDate = formBuilder.control(false);
    this.hasDateSent = formBuilder.control(false);
    this.sources = formBuilder.control([]);
    this.form = formBuilder.group({
      title: this.title,
      hasDate: this.hasDate,
      hasDateSent: this.hasDateSent,
      sources: this.sources,
    });
  }

  ngOnInit(): void {
    if (this._dedication) {
      this.updateForm(this._dedication);
    }
  }

  private updateForm(model: LitDedication): void {
    if (!model) {
      this.initialSources = [];
      this.date = null;
      this.dateSent = null;
      this.participants = [];
      this.form.reset();
      return;
    }
    this.initialSources = model.sources || [];
    this.date = model.date;
    this.dateSent = model.dateSent;
    this.title.setValue(model.title);
    this.initialParticipants = model.participants || [];
    this.hasDate.setValue(model.date ? true : false);
    this.hasDateSent.setValue(model.dateSent ? true : false);

    this.form.markAsPristine();
  }

  private getModel(): LitDedication {
    return {
      title: this.title.value?.trim(),
      date: this.hasDate.value ? this.date : undefined,
      dateSent: this.hasDateSent.value ? this.dateSent : undefined,
      participants: this.participants?.length ? this.participants : undefined,
      sources: this.sources.value?.length ? this.sources.value : undefined,
    };
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date = date;
    this.form.markAsDirty();
  }

  public onDateSentChange(date: HistoricalDateModel): void {
    this.dateSent = date;
    this.form.markAsDirty();
  }

  public onSourcesChange(sources: DocReference[]): void {
    this.sources.setValue(sources);
    this.form.markAsDirty();
  }

  public onParticipantsChange(ids: DecoratedId[]): void {
    this.participants = ids;
    this.form.markAsDirty();
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.dedicationChange.emit(this.getModel());
  }
}
