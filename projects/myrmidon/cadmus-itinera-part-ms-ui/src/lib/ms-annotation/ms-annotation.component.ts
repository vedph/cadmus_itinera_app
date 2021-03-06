import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry, DocReference } from '@myrmidon/cadmus-core';
import { MsAnnotation, MsLocationRange, MsLocationService } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-ms-annotation',
  templateUrl: './ms-annotation.component.html',
  styleUrls: ['./ms-annotation.component.css'],
})
export class MsAnnotationComponent implements OnInit {
  private _annotation: MsAnnotation | undefined;

  @Input()
  public get annotation(): MsAnnotation | undefined {
    return this._annotation;
  }
  public set annotation(value: MsAnnotation | undefined) {
    this._annotation = value;
    this.updateForm(value);
  }

  @Input()
  public langEntries: ThesaurusEntry[] | undefined;
  @Input()
  public typeEntries: ThesaurusEntry[] | undefined;
  @Input()
  public docRefTagEntries: ThesaurusEntry[] | undefined;

  @Output()
  public annotationChange: EventEmitter<MsAnnotation>;

  @Output()
  public editorClose: EventEmitter<any>;

  public language: FormControl;
  public type: FormControl;
  public text: FormControl;
  public ranges: FormControl;
  public personId: FormControl;
  public sources: FormControl;
  public form: FormGroup;

  public initialSources: DocReference[];

  constructor(
    formBuilder: FormBuilder,
    private _locService: MsLocationService
  ) {
    this.initialSources = [];
    // events
    this.annotationChange = new EventEmitter<MsAnnotation>();
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
    this.ranges = formBuilder.control(
      null,
      Validators.pattern(MsLocationService.rangesRegexp)
    );
    this.personId = formBuilder.control(null, Validators.maxLength(50));
    this.sources = formBuilder.control([]);
    this.form = formBuilder.group({
      language: this.language,
      type: this.type,
      text: this.text,
      ranges: this.ranges,
      personId: this.personId,
      sources: this.sources,
    });
  }

  ngOnInit(): void {
    if (this._annotation) {
      this.updateForm(this.annotation);
    }
  }

  private updateForm(model: MsAnnotation): void {
    if (!model) {
      this.initialSources = [];
      this.form.reset();
      return;
    }
    this.initialSources = model.sources || [];
    this.language.setValue(model.language);
    this.type.setValue(model.type);
    this.text.setValue(model.text);
    this.ranges.setValue(
      model.ranges
        ? model.ranges
            .map((r) => {
              return this._locService.rangeToString(r);
            })
            .join(' ')
        : null
    );
    this.personId.setValue(model.personId);
    this.form.markAsPristine();
  }

  private splitText(text: string, delimiter = ' '): string[] | undefined {
    if (!text) {
      return undefined;
    }
    const tokens = text
      .split(delimiter)
      .map((t) => {
        return t.trim();
      })
      .filter((t) => {
        return t.length > 0;
      });
    return tokens.length ? tokens : undefined;
  }

  private parseRanges(text: string): MsLocationRange[] | undefined {
    const tokens = this.splitText(text);
    if (!tokens) {
      return undefined;
    }
    const ranges: MsLocationRange[] = tokens
      .map((t) => {
        const bounds = t.split('-');
        const start = this._locService.parseLocation(bounds[0]);
        return {
          start: start,
          end:
            bounds.length > 1
              ? this._locService.parseLocation(bounds[1])
              : start,
        };
      })
      .filter((r) => (r ? true : false));
    return ranges.length ? ranges : undefined;
  }

  private getModel(): MsAnnotation {
    return {
      language: this.language.value?.trim(),
      type: this.type.value?.trim(),
      text: this.text.value?.trim(),
      ranges: this.parseRanges(this.ranges.value),
      personId: this.personId.value?.trim(),
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
    this.annotationChange.emit(this.getModel());
  }
}
