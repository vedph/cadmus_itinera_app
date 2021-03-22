import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  MsHand,
  MsHandSign,
  MsLocation,
  MsLocationRange,
  MsLocationService,
  MsRubrication,
} from '@myrmidon/cadmus-itinera-core';
import { NoteSet } from '@myrmidon/cadmus-itinera-ui';
import { DialogService } from '@myrmidon/cadmus-ui';
import { take } from 'rxjs/operators';

/**
 * Manuscript's hand editor.
 */
@Component({
  selector: 'itinera-ms-hand',
  templateUrl: './ms-hand.component.html',
  styleUrls: ['./ms-hand.component.css'],
})
export class MsHandComponent implements OnInit {
  @Input()
  public model: MsHand;

  @Output()
  public modelChange: EventEmitter<MsHand>;
  @Output()
  public editorClose: EventEmitter<any>;

  @Input()
  public handTypeEntries: ThesaurusEntry[];
  @Input()
  public signTypeEntries: ThesaurusEntry[];
  @Input()
  public reasonEntries: ThesaurusEntry[];
  @Input()
  public rubrEntries: ThesaurusEntry[];
  @Input()
  public langEntries: ThesaurusEntry[];

  // general
  public id: FormControl;
  public personId: FormControl;
  public idReason: FormControl;
  public types: FormArray;
  public ranges: FormArray;
  public extentNote: FormControl;
  public description: FormControl;
  public imageIds: FormControl;
  // notes
  public noteSet: NoteSet;
  // rubrications
  public rubrications: FormArray;
  // subscription
  public subForm: FormGroup;
  public subPresent: FormControl;
  public subLocations: FormControl;
  public subLanguage: FormControl;
  public subText: FormControl;
  // signs
  public signs: MsHandSign[];
  public editedIndex: number;
  public editorOpen: boolean;
  public editedSign: MsHandSign;

  public form: FormGroup;

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _locService: MsLocationService,
    private _dialogService: DialogService
  ) {
    // events
    this.modelChange = new EventEmitter<MsHand>();
    this.editorClose = new EventEmitter();
    // form - general
    this.id = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.personId = _formBuilder.control(null, Validators.maxLength(50));
    this.idReason = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.types = _formBuilder.array([], Validators.required);
    this.ranges = _formBuilder.array([], Validators.required);
    this.extentNote = _formBuilder.control(null, Validators.maxLength(500));
    this.description = _formBuilder.control(null, Validators.maxLength(1000));
    this.imageIds = _formBuilder.control(null, Validators.maxLength(500));
    // form - notes
    this.noteSet = {
      definitions: [
        {
          key: 'i',
          label: 'initials',
          maxLength: 500,
        },
        {
          key: 'c',
          label: 'corrections',
          maxLength: 500,
        },
        {
          key: 'p',
          label: 'punctuation',
          maxLength: 500,
        },
        {
          key: 'a',
          label: 'abbreviations',
          markdown: true,
          maxLength: 1000,
        },
      ],
    };
    // form - rubrications
    this.rubrications = _formBuilder.array([]);
    // form - subscription
    // the subscription form gets enabled/disabled according to this
    // (disabling the nested form also disables its own validation)
    this.subPresent = _formBuilder.control(false);
    this.subLocations = _formBuilder.control(null, [
      Validators.maxLength(500),
      Validators.required,
      Validators.pattern(MsLocationService.locsRegexp),
    ]);
    this.subLanguage = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.subText = _formBuilder.control(null, Validators.maxLength(1000));
    this.subForm = _formBuilder.group({
      subLocations: this.subLocations,
      subLanguage: this.subLanguage,
      subText: this.subText,
    });
    // form - signs
    this.signs = [];
    // form
    this.form = _formBuilder.group({
      // general
      id: this.id,
      personId: this.personId,
      idReason: this.idReason,
      types: this.types,
      ranges: this.ranges,
      extentNote: this.extentNote,
      description: this.description,
      imageIds: this.imageIds,
      // rubrications
      rubrications: this.rubrications,
      // subscription
      subPresent: this.subPresent,
      subscription: this.subForm,
    });
  }

  private toggleSubscription(enabled: boolean): void {
    if (enabled) {
      this.subForm.enable();
    } else {
      this.subForm.disable();
    }
  }

  ngOnInit(): void {
    this.toggleSubscription(false);
    this.subPresent.valueChanges.subscribe((present) => {
      this.toggleSubscription(present);
    });
    this.updateForm(this.model);
  }

  private updateForm(model: MsHand): void {
    // general
    this.id.setValue(model.id);
    this.personId.setValue(model.personId);
    this.idReason.setValue(model.idReason);
    this.types.clear();

    for (const type of model.types || []) {
      this.addType(type);
    }

    this.ranges.clear();
    for (const range of model.ranges || []) {
      this.addRange(range);
    }

    this.extentNote.setValue(model.extentNote);
    this.description.setValue(model.description);
    this.imageIds.setValue(model.imageIds ? model.imageIds.join(' ') : null);

    // notes
    this.noteSet = {
      definitions: this.noteSet.definitions,
      notes: new Map([
        ['i', model.initials],
        ['c', model.corrections],
        ['p', model.punctuation],
        ['a', model.abbreviations],
      ]),
    };

    // rubrications
    this.rubrications.clear();
    for (const rubrication of model.rubrications || []) {
      this.addRubrication(rubrication);
    }

    // subscription
    if (this.model.subscription) {
      this.subPresent.setValue(true);
      if (model.subscription.locations?.length) {
        this.subLocations.setValue(
          model.subscription.locations
            .map((l) => {
              return this._locService.locationToString(l);
            })
            .join(' ')
        );
      } else {
        this.subLocations.setValue(null);
      }
      this.subLanguage.setValue(model.subscription.language);
      this.subText.setValue(model.subscription.text);
    } else {
      this.subPresent.setValue(false);
      this.subForm.reset();
    }

    // signs
    this.signs = model.signs || [];
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

  private parseLocations(text: string): MsLocation[] | undefined {
    const tokens = this.splitText(text);
    if (!tokens) {
      return undefined;
    }
    const locations: MsLocation[] = tokens
      .map((t) => {
        return this._locService.parseLocation(t);
      })
      .filter((l) => (l ? true : false));
    return locations.length ? locations : undefined;
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

  private getSetNote(key: string): string | undefined {
    return this.noteSet.notes.has(key)
      ? this.noteSet.notes.get(key)
      : undefined;
  }

  private getModel(): MsHand {
    const model: MsHand = {
      // general
      id: this.id.value?.trim(),
      personId: this.personId.value?.trim(),
      idReason: this.idReason.value?.trim(),
      types: this.getTypes(),
      ranges: this.getRanges(),
      extentNote: this.extentNote.value?.trim(),
      description: this.description.value?.trim(),
      imageIds: this.splitText(this.imageIds.value),
      // notes
      initials: this.getSetNote('i'),
      corrections: this.getSetNote('c'),
      punctuation: this.getSetNote('p'),
      abbreviations: this.getSetNote('a'),
      // rubrications
      rubrications: this.getRubrications(),
      // signs
      signs: this.signs.length ? this.signs : undefined,
    };

    // subscription (if checked)
    if (this.subPresent.value) {
      model.subscription = {
        locations: this.parseLocations(this.subLocations.value),
        language: this.subLanguage.value?.trim(),
        text: this.subText.value?.trim(),
      };
    }

    return model;
  }

  public onNoteChange(note: KeyValue<string, string>): void {
    // replace note in set
    const map = new Map<string, string>();
    for (let key of this.noteSet.notes.keys()) {
      map.set(key, key === note.key ? note.value : this.noteSet.notes.get(key));
    }
    this.noteSet = {
      definitions: this.noteSet.definitions,
      notes: map,
    };
    this.form.markAsDirty();
  }

  //#region Types
  private getTypeGroup(type?: string): FormGroup {
    return this._formBuilder.group({
      name: this._formBuilder.control(type, [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  public addType(item?: string): void {
    this.types.push(this.getTypeGroup(item));
    this.types.markAsDirty();
  }

  public removeType(index: number): void {
    this.types.removeAt(index);
    this.types.markAsDirty();
  }

  public moveTypeUp(index: number): void {
    if (index < 1) {
      return;
    }
    const type = this.types.controls[index];
    this.types.removeAt(index);
    this.types.insert(index - 1, type);
    this.types.markAsDirty();
  }

  public moveTypeDown(index: number): void {
    if (index + 1 >= this.types.length) {
      return;
    }
    const type = this.types.controls[index];
    this.types.removeAt(index);
    this.types.insert(index + 1, type);
    this.types.markAsDirty();
  }

  private getTypes(): string[] | undefined {
    const entries: string[] = [];
    for (let i = 0; i < this.types.length; i++) {
      const g = this.types.at(i) as FormGroup;
      entries.push(g.controls.name.value?.trim());
    }
    return entries.length ? entries : undefined;
  }
  //#endregion

  //#region Ranges
  private getRangeGroup(range?: MsLocationRange): FormGroup {
    return this._formBuilder.group({
      start: this._formBuilder.control(
        this._locService.locationToString(range?.start),
        [Validators.required, Validators.pattern(MsLocationService.locRegexp)]
      ),
      end: this._formBuilder.control(
        this._locService.locationToString(range?.end),
        [Validators.required, Validators.pattern(MsLocationService.locRegexp)]
      ),
    });
  }

  public addRange(item?: MsLocationRange): void {
    this.ranges.push(this.getRangeGroup(item));
    this.ranges.markAsDirty();
  }

  public removeRange(index: number): void {
    this.ranges.removeAt(index);
    this.ranges.markAsDirty();
  }

  public moveRangeUp(index: number): void {
    if (index < 1) {
      return;
    }
    const range = this.ranges.controls[index];
    this.ranges.removeAt(index);
    this.ranges.insert(index - 1, range);
    this.ranges.markAsDirty();
  }

  public moveRangeDown(index: number): void {
    if (index + 1 >= this.ranges.length) {
      return;
    }
    const range = this.ranges.controls[index];
    this.ranges.removeAt(index);
    this.ranges.insert(index + 1, range);
    this.ranges.markAsDirty();
  }

  private getRanges(): MsLocationRange[] | undefined {
    const entries: MsLocationRange[] = [];
    for (let i = 0; i < this.ranges.length; i++) {
      const g = this.ranges.at(i) as FormGroup;
      entries.push({
        start: this._locService.parseLocation(g.controls.start.value),
        end: this._locService.parseLocation(g.controls.end.value),
      });
    }
    return entries.length ? entries : undefined;
  }
  //#endregion

  //#region Rubrications
  private getRubricationGroup(rubrication?: MsRubrication): FormGroup {
    return this._formBuilder.group({
      rubRanges: this._formBuilder.control(
        rubrication.ranges
          ? rubrication.ranges
              .map((r) => {
                return this._locService.rangeToString(r);
              })
              .join(' ')
          : null,
        [
          Validators.maxLength(500),
          Validators.required,
          Validators.pattern(MsLocationService.rangesRegexp),
        ]
      ),
      type: this._formBuilder.control(rubrication?.type, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: this._formBuilder.control(
        rubrication?.description,
        Validators.maxLength(500)
      ),
      issues: this._formBuilder.control(
        rubrication?.issues,
        Validators.maxLength(500)
      ),
    });
  }

  public addRubrication(item?: MsRubrication): void {
    this.rubrications.push(this.getRubricationGroup(item));
    this.rubrications.markAsDirty();
  }

  public removeRubrication(index: number): void {
    this.rubrications.removeAt(index);
    this.rubrications.markAsDirty();
  }

  public moveRubricationUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.rubrications.controls[index];
    this.rubrications.removeAt(index);
    this.rubrications.insert(index - 1, item);
    this.rubrications.markAsDirty();
  }

  public moveRubricationDown(index: number): void {
    if (index + 1 >= this.rubrications.length) {
      return;
    }
    const item = this.rubrications.controls[index];
    this.rubrications.removeAt(index);
    this.rubrications.insert(index + 1, item);
    this.rubrications.markAsDirty();
  }

  private getRubrications(): MsRubrication[] | undefined {
    const entries: MsRubrication[] = [];
    for (let i = 0; i < this.rubrications.length; i++) {
      const g = this.rubrications.at(i) as FormGroup;
      entries.push({
        ranges: this.parseRanges(g.controls.rubRanges.value),
        type: g.controls.type.value?.trim(),
        description: g.controls.description.value?.trim(),
        issues: g.controls.issues.value?.trim(),
      });
    }
    return entries.length ? entries : undefined;
  }
  //#endregion

  //#region Signs
  public addSign(): void {
    const sign: MsHandSign = {
      id: null,
      type: null,
    };
    this.signs = [...this.signs, sign];
    this.editSign(this.signs.length - 1);
    this.form.markAsDirty();
  }

  public editSign(index: number): void {
    if (index < 0) {
      this.editedSign = null;
      this.editedIndex = -1;
      this.editorOpen = false;
    } else {
      this.editedSign = this.signs[index];
      this.editedIndex = index;
      this.editorOpen = true;
    }
  }

  public onSignSaved(item: MsHandSign): void {
    this.signs = this.signs.map((s, i) => (i === this.editedIndex ? item : s));
    this.editSign(-1);
    this.form.markAsDirty();
  }

  public onSignClosed(): void {
    this.editSign(-1);
  }

  public deleteSign(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete sign?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const signs = [...this.signs];
          signs.splice(index, 1);
          this.signs = signs;
          this.form.markAsDirty();
        }
      });
  }

  public moveSignUp(index: number): void {
    if (index < 1) {
      return;
    }
    const sign = this.signs[index];
    const signs = [...this.signs];
    signs.splice(index, 1);
    signs.splice(index - 1, 0, sign);
    this.signs = signs;
    this.form.markAsDirty();
  }

  public moveSignDown(index: number): void {
    if (index + 1 >= this.signs.length) {
      return;
    }
    const sign = this.signs[index];
    const signs = [...this.signs];
    signs.splice(index, 1);
    signs.splice(index + 1, 0, sign);
    this.signs = signs;
    this.form.markAsDirty();
  }
  //#endregion

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    const model = this.getModel();
    this.modelChange.emit(model);
  }
}
