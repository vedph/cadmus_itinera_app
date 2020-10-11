import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HistoricalDate, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { Chronotope, DocReference } from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cadmus-chronotope',
  templateUrl: './chronotope.component.html',
  styleUrls: ['./chronotope.component.css'],
})
export class ChronotopeComponent implements OnInit {
  private _chronotope: Chronotope;

  @Input()
  public get chronotope(): Chronotope {
    return this._chronotope;
  }
  public set chronotope(value: Chronotope) {
    this._chronotope = value;
    this.setModel(this._chronotope);
  }

  @Input()
  public tagEntries: ThesaurusEntry[];

  @Output()
  public chronotopeChange: EventEmitter<Chronotope>;

  @Output()
  public editorClose: EventEmitter<any>;

  // date
  public date: HistoricalDate;

  // sources
  public sources$: BehaviorSubject<DocReference[]>;
  public sources: DocReference[];

  public form: FormGroup;
  public tag: FormControl;
  public place: FormControl;
  public textDate: FormControl;

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
    this.form = formBuilder.group({
      tag: this.tag,
      place: this.place,
      textDate: this.textDate,
    });
  }

  ngOnInit(): void {}

  public onSourcesChange(sources: DocReference[]): void {
    this.sources = sources;
  }

  private setModel(model: Chronotope): void {
    if (!model) {
      this.date = null;
      this.sources$.next([]);
      this.form.reset();
      return;
    } else {
      this.tag.setValue(model.tag);
      this.place.setValue(model.place);
      this.textDate.setValue(model.textDate);
      this.sources$.next(model.sources || []);
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
