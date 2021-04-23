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
import { Chronotope } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-chronotope',
  templateUrl: './chronotope.component.html',
  styleUrls: ['./chronotope.component.css'],
})
export class ChronotopeComponent implements OnInit {
  private _chronotope: Chronotope | undefined;

  @Input()
  public get chronotope(): Chronotope | undefined {
    return this._chronotope;
  }
  public set chronotope(value: Chronotope | undefined) {
    this._chronotope = value;
    this.updateForm(value);
  }

  @Input()
  public tagEntries: ThesaurusEntry[] | undefined;
  @Input()
  public docRefTagEntries: ThesaurusEntry[] | undefined;

  @Output()
  public chronotopeChange: EventEmitter<Chronotope>;

  @Output()
  public editorClose: EventEmitter<any>;

  public tag: FormControl;
  public place: FormControl;
  public placeDubious: FormControl;
  public textDate: FormControl;
  public hasDate: FormControl;
  public sources: FormControl;
  public form: FormGroup;

  public date: HistoricalDateModel;
  public initialSources: DocReference[];

  constructor(formBuilder: FormBuilder) {
    this.initialSources = [];

    // events
    this.chronotopeChange = new EventEmitter<Chronotope>();
    this.editorClose = new EventEmitter();

    // form
    this.tag = formBuilder.control(null, Validators.maxLength(50));
    this.place = formBuilder.control(null, Validators.maxLength(50));
    this.placeDubious = formBuilder.control(false);
    this.textDate = formBuilder.control(null, Validators.maxLength(300));
    this.hasDate = formBuilder.control(false, Validators.requiredTrue);
    this.sources = formBuilder.control([]);
    this.form = formBuilder.group({
      tag: this.tag,
      place: this.place,
      placeDubious: this.placeDubious,
      textDate: this.textDate,
      hasDate: this.hasDate,
      sources: this.sources,
    });
  }

  ngOnInit(): void {
    if (this._chronotope) {
      this.updateForm(this._chronotope);
    }
  }

  public onSourcesChange(sources: DocReference[]): void {
    this.sources.setValue(sources);
    this.form.markAsDirty();
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date = date;
    this.hasDate.setValue(date?.a?.value ? true : false);
    this.form.markAsDirty();
  }

  private updateForm(model: Chronotope): void {
    if (!model) {
      this.date = null;
      this.initialSources = [];
      this.form.reset();
      return;
    } else {
      this.initialSources = model.sources || [];
      this.date = model.date;
      this.tag.setValue(model.tag);
      this.place.setValue(model.place);
      this.placeDubious.setValue(model.isPlaceDubious);
      this.textDate.setValue(model.textDate);
      this.hasDate.setValue(model.date?.a?.value ? true : false);
      this.form.markAsPristine();
    }
  }

  private getModel(): Chronotope {
    return {
      tag: this.tag.value?.trim(),
      place: this.place.value?.trim(),
      isPlaceDubious: this.placeDubious.value? true : undefined,
      date: this.date,
      textDate: this.textDate.value?.trim(),
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
    const model = this.getModel();
    this.chronotopeChange.emit(model);
  }
}
