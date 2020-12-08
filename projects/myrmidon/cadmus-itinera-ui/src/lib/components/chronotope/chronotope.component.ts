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
  DocReference
} from '@myrmidon/cadmus-core';
import { Chronotope } from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cadmus-chronotope',
  templateUrl: './chronotope.component.html',
  styleUrls: ['./chronotope.component.css'],
})
export class ChronotopeComponent implements OnInit {
  @Input()
  public chronotope: Chronotope;

  @Input()
  public tagEntries: ThesaurusEntry[];

  @Output()
  public chronotopeChange: EventEmitter<Chronotope>;

  @Output()
  public editorClose: EventEmitter<any>;

  // date
  public date: HistoricalDateModel;

  // sources
  public sources$: BehaviorSubject<DocReference[]>;
  public sources: DocReference[];

  public form: FormGroup;
  public tag: FormControl;
  public place: FormControl;
  public textDate: FormControl;
  public hasDate: FormControl;

  constructor(formBuilder: FormBuilder) {
    // events
    this.chronotopeChange = new EventEmitter<Chronotope>();
    this.editorClose = new EventEmitter();

    // form
    this.sources$ = new BehaviorSubject<DocReference[]>([]);
    this.tag = formBuilder.control(null, Validators.maxLength(50));
    this.place = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.textDate = formBuilder.control(null, Validators.maxLength(300));
    this.hasDate = formBuilder.control(false, Validators.requiredTrue);
    this.form = formBuilder.group({
      tag: this.tag,
      place: this.place,
      textDate: this.textDate,
      hasDate: this.hasDate,
    });
  }

  ngOnInit(): void {
    this.updateForm(this.chronotope);
  }

  public onSourcesChange(sources: DocReference[]): void {
    this.sources = sources;
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
      this.sources$.next([]);
      this.form.reset();
      return;
    } else {
      this.sources$.next(model.sources || []);
      this.date = model.date;
      this.tag.setValue(model.tag);
      this.place.setValue(model.place);
      this.textDate.setValue(model.textDate);
      this.hasDate.setValue(model.date?.a?.value ? true : false);
      this.form.markAsPristine();
    }
  }

  private getModel(): Chronotope {
    return {
      tag: this.tag.value?.trim(),
      place: this.place.value?.trim(),
      date: this.date,
      textDate: this.textDate.value?.trim(),
      sources: this.sources?.length ? this.sources : null,
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
