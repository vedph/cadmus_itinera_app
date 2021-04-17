import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HistoricalDateModel, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsWatermark } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-ms-watermark',
  templateUrl: './ms-watermark.component.html',
  styleUrls: ['./ms-watermark.component.css'],
})
export class MsWatermarkComponent implements OnInit {
  @Input()
  public model: MsWatermark;

  @Input()
  public subjectEntries: ThesaurusEntry[];

  @Output()
  public modelChange: EventEmitter<MsWatermark>;

  @Output()
  public editorClose: EventEmitter<any>;

  public subject: FormControl;
  public rank: FormControl;
  public description: FormControl;
  public place: FormControl;
  public ids: FormControl;
  public form: FormGroup;

  public date: HistoricalDateModel;
  public initialIds: string[];

  constructor(formBuilder: FormBuilder) {
    // events
    this.modelChange = new EventEmitter<MsWatermark>();
    this.editorClose = new EventEmitter();
    this.initialIds = [];
    // form
    this.subject = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.rank = formBuilder.control(0);
    this.description = formBuilder.control(null, Validators.maxLength(500));
    this.place = formBuilder.control(null, Validators.maxLength(50));
    this.ids = formBuilder.control([]);
    this.form = formBuilder.group({
      subject: this.subject,
      rank: this.rank,
      description: this.description,
      place: this.place,
      ids: this.ids,
    });
  }

  ngOnInit(): void {
    this.updateForm(this.model);
  }

  private updateForm(model: MsWatermark): void {
    if (!model) {
      this.form.reset();
      this.date = null;
      this.initialIds = [];
      return;
    }
    this.subject.setValue(model.subject);
    this.rank.setValue(model.similarityRank);
    this.description.setValue(model.description);
    this.place.setValue(model.place);
    this.date = model.date;
    this.initialIds = model.externalIds || [];
    this.form.markAsPristine();
  }

  private getModel(): MsWatermark {
    return {
      subject: this.subject.value?.trim(),
      similarityRank: this.rank.value || 0,
      description: this.description.value?.trim(),
      place: this.place.value?.trim(),
      date: this.date,
      externalIds: this.ids.value?.length ? this.ids.value : undefined,
    };
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date = date;
    this.form.markAsDirty();
  }

  public onIdsChange(ids: string[]): void {
    this.ids.setValue(ids);
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
