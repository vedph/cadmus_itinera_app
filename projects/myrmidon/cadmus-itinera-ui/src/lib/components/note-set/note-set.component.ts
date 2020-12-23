import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DialogService } from '@myrmidon/cadmus-ui';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  take,
} from 'rxjs/operators';

/**
 * The definition of a note in a set of notes.
 */
export interface NoteSetDefinition {
  key: string;
  label: string;
  markdown?: boolean;
  required?: boolean;
  maxLength?: number;
}

/**
 * A set of notes with their definitions.
 */
export interface NoteSet {
  definitions: NoteSetDefinition[];
  notes?: Map<string, string>;
}

/**
 * A set of editable notes, either plain text or Markdown.
 * Each note has a key, a label, and some metadata for its format
 * and validation. Whenever the user saves his changes to a note,
 * the noteChange event is emitted with its key and value.
 * To use this component, just bind its set property to a set,
 * and handle the noteChange event. You can optionally set the
 * parentForm property to your parent control's form, to let validation
 * bubble up to it.
 */
@Component({
  selector: 'itinera-note-set',
  templateUrl: './note-set.component.html',
  styleUrls: ['./note-set.component.css'],
})
export class NoteSetComponent implements OnInit {
  private _set: NoteSet;
  private _parentForm: FormGroup | undefined;

  /**
   * The optional parent form.
   */
  @Input()
  public get parentForm(): FormGroup | undefined {
    return this._parentForm;
  }
  public set parentForm(value: FormGroup | undefined) {
    this._parentForm = value;
    this.form.setParent(value);
  }

  /**
   * The set of notes with their definitions.
   */
  @Input()
  public get set(): NoteSet {
    return this._set;
  }
  public set set(value: NoteSet | undefined) {
    this._set = value || { definitions: [] };
    this.updateForm();
  }

  /**
   * Event emitted whenever a note is changed.
   */
  @Output()
  public noteChange: EventEmitter<KeyValue<string, string>>;

  public form: FormGroup;
  public key: FormControl;
  public text: FormControl;
  public reqNotes: FormControl;

  public keys: KeyValue<string, string>[];
  public noteCount: number;
  public currentDef: NoteSetDefinition | undefined;
  public currentLen: number;
  public missing: string[] | undefined;

  constructor(formBuilder: FormBuilder, private _dialogService: DialogService) {
    this.keys = [];
    this.noteCount = 0;
    this.currentLen = 0;
    this.noteChange = new EventEmitter<KeyValue<string, string>>();
    // form
    this.text = formBuilder.control(null);
    this.key = formBuilder.control(null);
    this.reqNotes = formBuilder.control(true, Validators.requiredTrue);
    this.form = formBuilder.group({
      note: this.key,
      text: this.text,
      reqNotes: this.reqNotes,
    });
  }

  ngOnInit(): void {
    // when a key changes, edit its note
    this.key.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(10))
      .subscribe((k: string) => {
        this.editNote(k);
      });

    // show text length when typing
    this.text.valueChanges
      .pipe(
        map((text) => {
          return text?.length || 0;
        }),
        distinctUntilChanged(),
        debounceTime(50)
      )
      .subscribe((n) => {
        this.currentLen = n;
      });

    // set this form as child of parent form if any
    if (this._parentForm) {
      this.form.setParent(this._parentForm);
    }
  }

  /**
   * Update the count of non-falsy notes.
   */
  private updateNoteCount(): void {
    if (!this._set?.notes?.size) {
      this.noteCount = 0;
    } else {
      let n = 0;
      this._set.notes.forEach((v: string, k: string) => {
        if (v) {
          n++;
        }
      });
      this.noteCount = n;
    }
  }

  private updateForm(): void {
    if (!this._set.definitions.length) {
      this.form.reset();
      this.keys = [];
      this.noteCount = 0;
      return;
    }

    // extract keys and labels
    this.keys = this._set.definitions.map((d) => {
      return {
        key: d.key,
        value: d.label,
      } as KeyValue<string, string>;
    });

    // update notes count
    this.updateNoteCount();
  }

  /**
   * Edit the note with the specified key.
   */
  private editNote(key: string): void {
    this.text.clearValidators();
    this.text.setValue(this._set.notes.get(key));

    // set validators
    this.currentDef = this._set.definitions.find((d) => d.key === key);
    const validators: ValidatorFn[] = [];
    if (this.currentDef.required) {
      validators.push(Validators.required);
    }
    if (this.currentDef.maxLength) {
      validators.push(Validators.maxLength(this.currentDef.maxLength));
    }
    this.text.setValidators(validators);
    this.text.updateValueAndValidity();

    this.text.markAsPristine();
  }

  public revertNote(): void {
    if (this.currentDef) {
      this.editNote(this.currentDef.key);
    }
  }

  /**
   * Get the list of missing notes.
   */
  private getMissingNotes(): string[] {
    const missing: string[] = [];
    this._set.definitions.forEach((def) => {
      if (
        def.required &&
        (!this._set.notes.has(def.key) || !this._set.notes.get(def.key))
      ) {
        missing.push(def.label || def.key);
      }
    });
    return missing;
  }

  private saveNote(note: KeyValue<string, string>): void {
    this._set.notes.set(note.key, note.value);

    this.text.markAsPristine();
    this.updateNoteCount();

    this.missing = this.getMissingNotes();
    this.reqNotes.setValue(this.missing.length ? false : true);

    this.noteChange.emit({
      key: this.currentDef.key,
      value: this._set.notes.get(this.currentDef.key),
    });
  }

  /**
   * Save the currently edited note.
   */
  public save(): void {
    if (!this.currentDef || this.text.invalid) {
      return;
    }
    this.saveNote({
      key: this.currentDef.key,
      value: this.text.value?.trim(),
    });
  }

  /**
   * Clear the currently edited note.
   */
  public clear(): void {
    if (!this.currentDef) {
      return;
    }
    this._dialogService
      .confirm('Confirmation', `Delete note ${this.currentDef.label}?`)
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.text.reset();
          this.saveNote({
            key: this.currentDef.key,
            value: null,
          });
        }
      });
  }
}
