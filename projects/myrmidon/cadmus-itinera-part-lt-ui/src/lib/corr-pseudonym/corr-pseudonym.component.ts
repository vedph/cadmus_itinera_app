import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { CorrPseudonym, DocReference } from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cadmus-corr-pseudonym',
  templateUrl: './corr-pseudonym.component.html',
  styleUrls: ['./corr-pseudonym.component.css'],
})
export class CorrPseudonymComponent implements OnInit {
  private _sources: DocReference[];

  @Input()
  public model: CorrPseudonym;

  @Input()
  public langEntries: ThesaurusEntry[];
  @Input()
  public tagEntries: ThesaurusEntry[];

  @Output()
  public modelChange: EventEmitter<CorrPseudonym>;

  @Output()
  public editorClose: EventEmitter<any>;

  public language: FormControl;
  public value: FormControl;
  public author: FormControl;
  public form: FormGroup;

  public sources$: BehaviorSubject<DocReference[]>;

  constructor(formBuilder: FormBuilder) {
    this._sources = [];
    this.sources$ = new BehaviorSubject<DocReference[]>([]);
    // events
    this.modelChange = new EventEmitter<CorrPseudonym>();
    this.editorClose = new EventEmitter();
    // form
    this.language = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.value = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.author = formBuilder.control(false);
    this.form = formBuilder.group({
      language: this.language,
      value: this.value,
      author: this.author
    });
  }

  ngOnInit(): void {
    this.updateForm(this.model);
  }

  private updateForm(model: CorrPseudonym): void {
    if (!model) {
      this.sources$.next([]);
      this.form.reset();
      return;
    }
    this.sources$.next(model.sources || []);
    this.language.setValue(model.language);
    this.value.setValue(model.value);
    this.author.setValue(model.isAuthor);
    this.form.markAsPristine();
  }

  private getModel(): CorrPseudonym {
    return {
      language: this.language.value?.trim(),
      value: this.value.value?.trim(),
      isAuthor: this.author.value,
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
