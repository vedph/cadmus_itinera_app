import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry, DocReference } from '@myrmidon/cadmus-core';
import { CorrPseudonym } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-corr-pseudonym',
  templateUrl: './corr-pseudonym.component.html',
  styleUrls: ['./corr-pseudonym.component.css'],
})
export class CorrPseudonymComponent implements OnInit {
  @Input()
  public model: CorrPseudonym;

  @Input()
  public langEntries: ThesaurusEntry[] | undefined;
  @Input()
  public tagEntries: ThesaurusEntry[] | undefined;

  @Output()
  public modelChange: EventEmitter<CorrPseudonym>;

  @Output()
  public editorClose: EventEmitter<any>;

  public language: FormControl;
  public value: FormControl;
  public author: FormControl;
  public sources: FormControl;
  public form: FormGroup;

  public initialSources: DocReference[];

  constructor(formBuilder: FormBuilder) {
    this.initialSources = [];
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
    this.sources = formBuilder.control([]);
    this.form = formBuilder.group({
      language: this.language,
      value: this.value,
      author: this.author,
      sources: this.sources
    });
  }

  ngOnInit(): void {
    this.updateForm(this.model);
  }

  private updateForm(model: CorrPseudonym): void {
    if (!model) {
      this.initialSources = [];
      this.form.reset();
      return;
    }
    this.initialSources = model.sources || [];
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
    this.modelChange.emit(this.getModel());
  }
}
