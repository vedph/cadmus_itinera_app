import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DocReference, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  MsDecoration,
  MsDecorationArtist,
  MsLocationService,
  MsDecorationElement,
  MsLocationRange,
} from '@myrmidon/cadmus-itinera-core';
import { DialogService } from '@myrmidon/cadmus-ui';
import { BehaviorSubject } from 'rxjs';
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
  private _elementIndex: number;
  public editedElement: MsDecorationElement | undefined;

  @Input()
  public decoration: MsDecoration;

  // ms-decoration-elem-types (required)
  @Input()
  public decElemTypeEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-artist-types
  @Input()
  public decArtTypeEntries: ThesaurusEntry[] | undefined;
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
  public place: FormControl;
  public note: FormControl;
  public elements: FormControl;
  public form: FormGroup;

  public references$: BehaviorSubject<DocReference[]>;

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
    this._elementIndex = -1;
    this.references$ = new BehaviorSubject<DocReference[]>([]);
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
    this.place = formBuilder.control(null, Validators.maxLength(50));
    this.elements = formBuilder.control([]);
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.artistPresent = formBuilder.control(false);

    // children forms
    this.artistForm = formBuilder.group({});

    // root form
    this.form = formBuilder.group({
      id: this.id,
      name: this.name,
      flags: this.flags,
      place: this.place,
      elements: this.elements,
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

    this.updateForm(this.decoration);
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
      this.form.reset();
      return;
    }
    this.id.setValue(decoration.id);
    this.name.setValue(decoration.name);
    this.flags.setValue(decoration.flags);
    this.place.setValue(decoration.place);
    this.note.setValue(decoration.note);

    // references
    this.references$.next(decoration.references || []);

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
      place: this.place.value?.trim(),
      note: this.note.value?.trim(),
    };

    // references
    if (this.references$.value.length) {
      model.references = this.references$.value;
    }

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
    this._elementIndex = this.elements.value.indexOf(element);
    this.editedElement = element;
  }

  public addElement(): void {
    this.editElement({
      type: 'pag-inc',
      flags: [],
      ranges: [],
    });
  }

  public onElementChange(element: MsDecorationElement): void {
    if (this._elementIndex > -1) {
      this.elements.value.splice(this._elementIndex, 1, element);
    } else {
      this.elements.value.push(element);
    }
    this.keys = this.getKeys(this.elements.value);
    this.onElementClose();
    this.form.markAsDirty();
  }

  public onElementClose(): void {
    this._elementIndex = -1;
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

  public onFlgSelectionChange(ids: string[]): void {
    this.flags.setValue(ids);
    this.form.markAsDirty();
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
