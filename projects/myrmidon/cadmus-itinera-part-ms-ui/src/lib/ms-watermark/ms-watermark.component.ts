import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HistoricalDate, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsWatermark } from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cadmus-ms-watermark',
  templateUrl: './ms-watermark.component.html',
  styleUrls: ['./ms-watermark.component.css'],
})
export class MsWatermarkComponent implements OnInit {
  private _model: MsWatermark;

  @Input()
  public get model(): MsWatermark {
    return this._model;
  }
  public set model(value: MsWatermark) {
    this._model = value;
    this.setModel(this._model);
  }

  @Input()
  public subjectEntries: ThesaurusEntry[];

  @Output()
  public modelChange: EventEmitter<MsWatermark>;

  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  public subject: FormControl;
  public rank: FormControl;
  public description: FormControl;
  public place: FormControl;

  public date: HistoricalDate;
  public ids$: BehaviorSubject<string[]>;
  public ids: string[];

  constructor(formBuilder: FormBuilder) {
    // events
    this.modelChange = new EventEmitter<MsWatermark>();
    this.editorClose = new EventEmitter();
    this.ids$ = new BehaviorSubject<string[]>([]);
    this.ids = [];
    // form
    this.subject = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.rank = formBuilder.control(0);
    this.description = formBuilder.control(null, Validators.maxLength(500));
    this.place = formBuilder.control(null, Validators.maxLength(50));
    this.form = formBuilder.group({
      subject: this.subject,
      rank: this.rank,
      description: this.description,
      place: this.place,
    });
  }

  ngOnInit(): void {}

  private setModel(model: MsWatermark): void {
    if (!model) {
      this.form.reset();
      this.date = null;
      this.ids = [];
      return;
    }
    this.subject.setValue(model.subject);
    this.rank.setValue(model.similarityRank);
    this.description.setValue(model.description);
    this.place.setValue(model.place);
    this.date = model.date;
    this.ids$.next(model.externalIds);
    this.form.markAsPristine();
  }

  private getModel(): MsWatermark {
    return {
      subject: this.subject.value?.trim(),
      similarityRank: this.rank.value || 0,
      description: this.description.value?.trim(),
      place: this.place.value?.trim(),
      date: this.date,
      externalIds: this.ids
    };
  }

  public onDateChanged(date: HistoricalDate): void {
    this.date = date;
  }

  public onIdsChanged(ids: string[]): void {
    this.ids = ids;
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
