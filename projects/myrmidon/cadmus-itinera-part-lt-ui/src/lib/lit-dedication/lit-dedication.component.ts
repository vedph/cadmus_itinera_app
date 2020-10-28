import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HistoricalDateModel, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { DocReference, LitDedication } from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cadmus-lit-dedication',
  templateUrl: './lit-dedication.component.html',
  styleUrls: ['./lit-dedication.component.css'],
})
export class LitDedicationComponent implements OnInit {
  private _sources: DocReference[];
  private _model: LitDedication;

  @Input()
  public get model(): LitDedication {
    return this._model;
  }
  public set model(value: LitDedication) {
    this._model = value;
    this.setModel(this._model);
  }

  @Input()
  public tagEntries: ThesaurusEntry[];

  @Output()
  public modelChange: EventEmitter<LitDedication>;

  @Output()
  public editorClose: EventEmitter<any>;

  public title: FormControl;
  public byAuthor: FormControl;
  public hasDate: FormControl;
  public hasDateSent: FormControl;
  public form: FormGroup;

  public date: HistoricalDateModel;
  public dateSent: HistoricalDateModel;
  public sources$: BehaviorSubject<DocReference[]>;

  constructor(formBuilder: FormBuilder) {
    this._sources = [];
    this.sources$ = new BehaviorSubject<DocReference[]>([]);
    // events
    this.modelChange = new EventEmitter<LitDedication>();
    this.editorClose = new EventEmitter();
    // form
    this.title = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.byAuthor = formBuilder.control(false);
    this.hasDate = formBuilder.control(false);
    this.hasDateSent = formBuilder.control(false);
    this.form = formBuilder.group({
      title: this.title,
      byAuthor: this.byAuthor,
      hasDate: this.hasDate,
      hasDateSent: this.hasDateSent,
    });
  }

  ngOnInit(): void {}

  private setModel(model: LitDedication): void {
    if (!model) {
      this.sources$.next([]);
      this.date = null;
      this.dateSent = null;
      this.form.reset();
      return;
    }
    this.sources$.next(model.sources || []);
    this.date = model.date;
    this.dateSent = model.dateSent;
    this.title.setValue(model.title);
    this.byAuthor.setValue(model.isByAuthor ? true : false);
    this.hasDate.setValue(model.date ? true : false);
    this.hasDateSent.setValue(model.dateSent ? true : false);

    this.form.markAsPristine();
  }

  private getModel(): LitDedication {
    return {
      title: this.title.value?.trim(),
      date: this.hasDate.value ? this.date : undefined,
      dateSent: this.hasDateSent.value ? this.dateSent : undefined,
      isByAuthor: this.byAuthor.value,
      sources: this._sources?.length ? this._sources : undefined,
    };
  }

  public onSourcesChanged(sources: DocReference[]): void {
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
