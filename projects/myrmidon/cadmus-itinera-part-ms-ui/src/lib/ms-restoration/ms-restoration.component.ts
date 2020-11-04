import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HistoricalDateModel, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  DocReference,
  MsRestoration,
} from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cadmus-ms-restoration',
  templateUrl: './ms-restoration.component.html',
  styleUrls: ['./ms-restoration.component.css'],
})
export class MsRestorationComponent implements OnInit {
  private _sources: DocReference[];

  @Input()
  public model: MsRestoration;

  @Input()
  public typeEntries: ThesaurusEntry[];

  @Output()
  public modelChange: EventEmitter<MsRestoration>;

  @Output()
  public editorClose: EventEmitter<any>;

  public type: FormControl;
  public place: FormControl;
  public personId: FormControl;
  public note: FormControl;
  public form: FormGroup;

  public sources$: BehaviorSubject<DocReference[]>;
  public date: HistoricalDateModel;

  constructor(formBuilder: FormBuilder) {
    this.sources$ = new BehaviorSubject<DocReference[]>([]);
    // events
    this.modelChange = new EventEmitter<MsRestoration>();
    this.editorClose = new EventEmitter();
    // form
    this.type = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.place = formBuilder.control(null, Validators.maxLength(50));
    this.personId = formBuilder.control(null, Validators.maxLength(50));
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.form = formBuilder.group({
      type: this.type,
      place: this.place,
      personId: this.personId,
      note: this.note,
    });
  }

  ngOnInit(): void {
    this.updateForm(this.model);
  }

  private updateForm(model: MsRestoration): void {
    if (!model) {
      this.sources$.next([]);
      this.form.reset();
      return;
    }
    this.sources$.next(model.sources || []);
    this.type.setValue(model.type);
    this.place.setValue(model.place);
    this.personId.setValue(model.personId);
    this.note.setValue(model.note);
    this.form.markAsPristine();
  }

  private getModel(): MsRestoration {
    return {
      type: this.type.value?.trim(),
      place: this.place.value?.trim(),
      personId: this.personId.value?.trim(),
      note: this.note.value?.trim(),
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
