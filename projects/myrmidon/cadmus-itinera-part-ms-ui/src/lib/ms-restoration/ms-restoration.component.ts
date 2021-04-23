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
import { MsRestoration } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-ms-restoration',
  templateUrl: './ms-restoration.component.html',
  styleUrls: ['./ms-restoration.component.css'],
})
export class MsRestorationComponent implements OnInit {
  private _restoration: MsRestoration | undefined;

  @Input()
  public get restoration(): MsRestoration | undefined {
    return this._restoration;
  }
  public set restoration(value: MsRestoration | undefined) {
    this._restoration = value;
    this.updateForm(value);
  }

  @Input()
  public typeEntries: ThesaurusEntry[] | undefined;
  @Input()
  public docRefTagEntries: ThesaurusEntry[] | undefined;

  @Output()
  public restorationChange: EventEmitter<MsRestoration>;

  @Output()
  public editorClose: EventEmitter<any>;

  public type: FormControl;
  public place: FormControl;
  public personId: FormControl;
  public note: FormControl;
  public sources: FormControl;
  public form: FormGroup;

  public initialSources: DocReference[];
  public date: HistoricalDateModel;

  constructor(formBuilder: FormBuilder) {
    this.initialSources = [];
    // events
    this.restorationChange = new EventEmitter<MsRestoration>();
    this.editorClose = new EventEmitter();
    // form
    this.type = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.place = formBuilder.control(null, Validators.maxLength(50));
    this.personId = formBuilder.control(null, Validators.maxLength(50));
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.sources = formBuilder.control([]);
    this.form = formBuilder.group({
      type: this.type,
      place: this.place,
      personId: this.personId,
      note: this.note,
      sources: this.sources,
    });
  }

  ngOnInit(): void {
    if (this._restoration) {
      this.updateForm(this._restoration);
    }
  }

  private updateForm(model: MsRestoration): void {
    if (!model) {
      this.initialSources = [];
      this.form.reset();
      return;
    }
    this.initialSources = model.sources || [];
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
      sources: this.sources.value?.length ? this.sources.value : undefined,
    };
  }

  public onSourcesChanged(sources: DocReference[]): void {
    this.sources.setValue(sources);
    this.form.markAsDirty();
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.restorationChange.emit(this.getModel());
  }
}
