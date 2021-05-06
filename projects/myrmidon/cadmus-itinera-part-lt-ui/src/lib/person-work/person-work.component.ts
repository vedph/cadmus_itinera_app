import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DocReference, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { Chronotope } from '@myrmidon/cadmus-itinera-core';
import { PersonWork } from '../person-works-part';

@Component({
  selector: 'itinera-person-work',
  templateUrl: './person-work.component.html',
  styleUrls: ['./person-work.component.css'],
})
export class PersonWorkComponent implements OnInit {
  private _work: PersonWork | undefined;

  @Input()
  public get work(): PersonWork | undefined {
    return this._work;
  }
  public set work(value: PersonWork | undefined) {
    this._work = value;
    this.updateForm(value);
  }

  // person-work-languages
  @Input()
  public langEntries: ThesaurusEntry[] | undefined;
  // person-work-genres
  @Input()
  public genreEntries: ThesaurusEntry[] | undefined;
  // doc-reference-tags
  @Input()
  public tagEntries: ThesaurusEntry[] | undefined;
  // chronotope-tags
  @Input()
  public ctTagEntries: ThesaurusEntry[] | undefined;

  @Output()
  public workChange: EventEmitter<PersonWork>;
  @Output()
  public editorClose: EventEmitter<any>;

  public language: FormControl;
  public dubious: FormControl;
  public lost: FormControl;
  public genre: FormControl;
  public titles: FormControl;
  public chronotopes: FormControl;
  public references: FormControl;
  public note: FormControl;
  public form: FormGroup;

  public initialReferences: DocReference[];

  constructor(formBuilder: FormBuilder) {
    this.workChange = new EventEmitter<PersonWork>();
    this.editorClose = new EventEmitter<any>();
    this.initialReferences = [];
    // form
    this.language = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.dubious = formBuilder.control(false);
    this.lost = formBuilder.control(false);
    this.genre = formBuilder.control(null, Validators.maxLength(50));
    this.titles = formBuilder.control(null, Validators.required);
    this.chronotopes = formBuilder.control([]);
    this.references = formBuilder.control([]);
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.form = formBuilder.group({
      language: this.language,
      dubious: this.dubious,
      lost: this.lost,
      genre: this.genre,
      titles: this.titles,
      chronotopes: this.chronotopes,
      references: this.references,
      note: this.note,
    });
  }

  ngOnInit(): void {
    if (this._work) {
      this.updateForm(this._work);
    }
  }

  private updateForm(model: PersonWork | undefined): void {
    if (!model) {
      this.form.reset();
      return;
    }

    this.language.setValue(model.language);
    this.dubious.setValue(model.isDubious);
    this.lost.setValue(model.isLost);
    this.genre.setValue(model.genre);
    this.titles.setValue((model.titles || []).join('\n'));
    this.chronotopes.setValue(model.chronotopes || []);
    this.initialReferences = model.references || [];
    this.note.setValue(model.note);

    this.form.markAsPristine();
  }

  private getWork(): PersonWork | null {
    return {
      language: this.language.value?.trim(),
      isDubious: this.dubious.value ? true : undefined,
      isLost: this.lost.value ? true : undefined,
      genre: this.genre.value?.trim(),
      titles: this.titles.value?.split('\n') || [],
      chronotopes: this.chronotopes.value?.length
        ? this.chronotopes.value
        : undefined,
      references: this.references.value?.length
        ? this.references.value
        : undefined,
      note: this.note.value?.trim(),
    };
  }

  public onChronotopesChange(chronotopes: Chronotope[]): void {
    this.chronotopes.setValue(chronotopes);
    this.form.markAsDirty();
  }

  public onReferencesChange(references: DocReference[]): void {
    this.references.setValue(references);
    this.form.markAsDirty();
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    const model = this.getWork();
    if (!model) {
      return;
    }
    this.workChange.emit(model);
  }
}
