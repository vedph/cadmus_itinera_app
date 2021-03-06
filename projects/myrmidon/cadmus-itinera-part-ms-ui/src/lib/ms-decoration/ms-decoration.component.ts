import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DocReference, HistoricalDateModel, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  MsDecoration,
  MsDecorationArtist,
  MsLocationService,
  MsDecorationElement,
  MsLocationRange,
} from '@myrmidon/cadmus-itinera-core';
import { DialogService } from '@myrmidon/cadmus-ui';
import { take } from 'rxjs/operators';

/**
 * Manuscript's decoration editor.
 * This component requires the ms-decoration-elem types thesaurus.
 * According to the type selected, it changes its UI by:
 * - filtering the content of all the other thesauri (except
 * ms-decoration-type-hidden, which has a special meaning),
 * when they have a hierarchy (i.e. their IDs contain a dot).
 * Such type-dependent thesauri have their entries IDs prefixed
 * with the type ID followed by dot. For instance, type "ill"
 * has some corresponding entries in a type-dependent thesaurus
 * like ms-decoration-elem-typologies, like "ill.miniature",
 * "ill.drawing", etc.
 * Also, if the filtered content of a thesaurus happens to have
 * an entry ID equal to "-" once the type prefix has been stripped
 * out, this means that in this case the corresponding control
 * should be a free text box rather than a selector.
 * This anyway does not apply to those controls allowing multiple
 * selections, like flags or colors.
 * - hiding some controls. When a type is selected, the thesaurus
 * ms-decoration-type-hidden is looked up to find an entry
 * with ID equal to the selected type ID. If found, it is assumed
 * that its value is a space-delimited list of names of those
 * controls which should be hidden.
 * This logic is effectively implemented by
 * MsDecorationElementComponent, which receives the thesauri set
 * on this parent component.
 */
@Component({
  selector: 'itinera-ms-decoration',
  templateUrl: './ms-decoration.component.html',
  styleUrls: ['./ms-decoration.component.css'],
})
export class MsDecorationComponent implements OnInit {
  private _decoration: MsDecoration | undefined;

  public editedElementIndex: number;
  public editedElement: MsDecorationElement | undefined;

  @Input()
  public get decoration(): MsDecoration | undefined {
    return this._decoration;
  }
  public set decoration(value: MsDecoration | undefined) {
    this._decoration = value;
    this.updateForm(value);
  }

  // doc-reference-tags
  @Input()
  public docRefTagEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-types (required)
  @Input()
  public decElemTypeEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-artist-types
  @Input()
  public decArtTypeEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-flags (multi)
  @Input()
  public decFlagEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-flags (multi)
  @Input()
  public decElemFlagEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-colors (multi)
  @Input()
  public decElemColorEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-gildings
  @Input()
  public decElemGildingEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-techniques
  @Input()
  public decElemTechEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-positions
  @Input()
  public decElemPosEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-tools
  @Input()
  public decElemToolEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-typologies
  @Input()
  public decElemTypolEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-type-hidden (special)
  @Input()
  public decTypeHiddenEntries: ThesaurusEntry[] | undefined;

  @Output()
  public decorationChange: EventEmitter<MsDecoration>;
  @Output()
  public editorClose: EventEmitter<any>;

  public id: FormControl;
  public name: FormControl;
  public flags: FormControl;
  public hasDate: FormControl;
  public date: FormControl;
  public place: FormControl;
  public note: FormControl;
  public elements: FormControl;
  public references: FormControl;
  public form: FormGroup;

  public initialReferences: DocReference[];

  public artistPresent: FormControl;
  public artistForm: FormGroup;
  public artist: MsDecorationArtist;

  public keys: string[];

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  constructor(
    formBuilder: FormBuilder,
    private _locService: MsLocationService,
    private _dialogService: DialogService
  ) {
    this.editedElementIndex = -1;
    this.initialReferences = [];
    this.keys = [];
    // events
    this.decorationChange = new EventEmitter<MsDecoration>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.id = formBuilder.control(null, [
      Validators.required,
      Validators.pattern('^[-0-9a-zA-Z_]+$'),
      Validators.maxLength(50),
    ]);
    this.name = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.flags = formBuilder.control([]);
    this.hasDate = formBuilder.control(false);
    this.date = formBuilder.control(null);
    this.place = formBuilder.control(null, Validators.maxLength(50));
    this.elements = formBuilder.control([]);
    this.references = formBuilder.control([]);
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.artistPresent = formBuilder.control(false);

    // children forms
    this.artistForm = formBuilder.group({});

    // root form
    this.form = formBuilder.group({
      id: this.id,
      name: this.name,
      flags: this.flags,
      hasDate: this.hasDate,
      date: this.date,
      place: this.place,
      elements: this.elements,
      references: this.references,
      note: this.note,
      artistPresent: this.artistPresent,
    });
  }

  ngOnInit(): void {
    this.artistPresent.valueChanges.subscribe((on) => {
      if (on) {
        this.artistForm.enable();
      } else {
        this.artistForm.disable();
      }
    });

    if (this._decoration) {
      this.updateForm(this._decoration);
    }
  }

  private getKeys(elements: MsDecorationElement[] | undefined): string[] {
    if (!elements) {
      return [];
    }
    const keys = elements?.map((e) => e.key).filter((e) => (e ? true : false));
    keys.sort();
    return keys;
  }

  private updateForm(decoration: MsDecoration): void {
    if (!decoration) {
      this.initialReferences = [];
      this.form.reset();
      return;
    }
    this.id.setValue(decoration.id);
    this.name.setValue(decoration.name);
    this.flags.setValue(decoration.flags);
    this.hasDate.setValue(decoration.date? true : false);
    this.date.setValue(decoration.date);
    this.place.setValue(decoration.place);
    this.note.setValue(decoration.note);
    this.elements.setValue(decoration.elements || []);
    this.initialReferences = decoration.references || [];

    // artist
    if (decoration.artist) {
      this.artistPresent.setValue(true);
      this.artist = decoration.artist;
    } else {
      this.artistPresent.setValue(false);
    }

    // parent keys
    this.keys = this.getKeys(decoration.elements);

    this.form.markAsPristine();
  }

  private getModel(): MsDecoration {
    const model: MsDecoration = {
      id: this.id.value?.trim(),
      name: this.name.value?.trim(),
      flags: this.flags.value?.length ? this.flags.value : undefined,
      date: this.hasDate.value? this.date.value : undefined,
      place: this.place.value?.trim(),
      note: this.note.value?.trim(),
      elements: this.elements.value?.length ? this.elements.value : undefined,
      references: this.references.value?.length
        ? this.references.value
        : undefined,
    };

    // artist
    if (this.artistPresent.value) {
      model.artist = this.artist;
    }

    return model;
  }

  public onArtistChanged(artist: MsDecorationArtist): void {
    this.artist = artist;
    this.form.markAsDirty();
  }

  public editElement(element: MsDecorationElement): void {
    this.editedElementIndex = this.elements.value.indexOf(element);
    this.editedElement = element;
  }

  public addElement(): void {
    this.editedElementIndex = -1;
    this.editedElement = {
      type: 'pag-inc',
      flags: [],
      ranges: [],
    };
  }

  public onElementChange(element: MsDecorationElement): void {
    if (this.editedElementIndex > -1) {
      this.elements.value.splice(this.editedElementIndex, 1, element);
    } else {
      this.elements.value.push(element);
    }
    this.keys = this.getKeys(this.elements.value);
    this.onElementClose();
    this.elements.updateValueAndValidity();
    this.form.markAsDirty();
  }

  public onElementClose(): void {
    this.editedElementIndex = -1;
    this.editedElement = undefined;
  }

  public deleteElement(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete element?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.elements.value.splice(index, 1);
          this.keys = this.getKeys(this.elements.value);
          this.elements.updateValueAndValidity();
          this.form.markAsDirty();
        }
      });
  }

  public moveElementUp(index: number): void {
    if (index < 1) {
      return;
    }
    const element = this.elements.value[index];
    this.elements.value.splice(index, 1);
    this.elements.value.splice(index - 1, element);
    this.form.markAsDirty();
  }

  public moveElementDown(index: number): void {
    if (index + 1 >= this.elements.value.length) {
      return;
    }
    const element = this.elements.value[index];
    this.elements.value.splice(index, 1);
    this.elements.value.splice(index + 1, element);
    this.form.markAsDirty();
  }

  public rangesToString(ranges: MsLocationRange[] | undefined): string {
    if (!ranges?.length) {
      return '';
    }
    const tokens = ranges.map((r) => {
      return `${this._locService.locationToString(
        r.start
      )}-${this._locService.locationToString(r.end)}`;
    });
    return tokens.join(' ');
  }

  public typeToString(id: string): string {
    const entry = this.decElemTypeEntries?.find((e) => e.id === id);
    return entry ? entry.value : id;
  }

  public onFlgSelectionChange(ids: string[]): void {
    this.flags.setValue(ids);
    this.form.markAsDirty();
  }

  public onReferencesChange(references: DocReference[]): void {
    this.references.setValue(references);
    this.form.markAsDirty();
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date.setValue(date);
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    const model = this.getModel();
    this.decorationChange.emit(model);
  }
}
