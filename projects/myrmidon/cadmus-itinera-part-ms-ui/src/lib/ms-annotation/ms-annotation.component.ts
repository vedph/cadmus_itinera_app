import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  DocReference,
  MsAnnotation,
  MsLocationService,
} from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cadmus-ms-annotation',
  templateUrl: './ms-annotation.component.html',
  styleUrls: ['./ms-annotation.component.css'],
})
export class MsAnnotationComponent implements OnInit {
  private _model: MsAnnotation;
  private _sources: DocReference[];

  @Input()
  public get model(): MsAnnotation {
    return this._model;
  }
  public set model(value: MsAnnotation) {
    this._model = value;
    this.setModel(this._model);
  }

  @Input()
  public langEntries: ThesaurusEntry[];
  @Input()
  public typeEntries: ThesaurusEntry[];

  @Output()
  public modelChange: EventEmitter<MsAnnotation>;

  @Output()
  public editorClose: EventEmitter<any>;

  public language: FormControl;
  public type: FormControl;
  public text: FormControl;
  public start: FormControl;
  public end: FormControl;
  public personId: FormControl;
  public form: FormGroup;

  public sources$: BehaviorSubject<DocReference[]>;

  constructor(
    formBuilder: FormBuilder,
    private _msLocationService: MsLocationService
  ) {
    this.sources$ = new BehaviorSubject<DocReference[]>([]);
    // events
    this.modelChange = new EventEmitter<MsAnnotation>();
    this.editorClose = new EventEmitter();
    // form
    this.language = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.type = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.text = formBuilder.control(null, Validators.maxLength(1000));
    this.start = formBuilder.control(
      null,
      Validators.pattern(MsLocationService.locRegexp)
    );
    this.end = formBuilder.control(
      null,
      Validators.pattern(MsLocationService.locRegexp)
    );
    this.personId = formBuilder.control(null, Validators.maxLength(50));
    this.form = formBuilder.group({
      language: this.language,
      type: this.type,
      text: this.text,
      start: this.start,
      end: this.end,
      personId: this.personId,
    });
  }

  ngOnInit(): void {}

  private setModel(model: MsAnnotation): void {
    if (!model) {
      this.sources$.next([]);
      this.form.reset();
      return;
    }
    this.sources$.next(model.sources || []);
    this.language.setValue(model.language);
    this.type.setValue(model.type);
    this.text.setValue(model.text);
    this.start.setValue(this._msLocationService.locationToString(model.start));
    this.end.setValue(this._msLocationService.locationToString(model.end));
    this.personId.setValue(model.personId);
    this.form.markAsPristine();
  }

  private getModel(): MsAnnotation {
    return {
      language: this.language.value?.trim(),
      type: this.type.value?.trim(),
      text: this.text.value?.trim(),
      start: this._msLocationService.parseLocation(this.start.value),
      end: this._msLocationService.parseLocation(this.end.value),
      personId: this.personId.value?.trim(),
      sources: this._sources?.length ? this._sources : undefined,
    };
  }

  public onSourcesChanged(sources: DocReference[]): void {
    this._sources = sources;
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
