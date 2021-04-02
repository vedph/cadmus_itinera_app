import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  MsDecorationElement,
  MsLocationRange,
  MsLocationService,
} from '@myrmidon/cadmus-itinera-core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'itinera-ms-decoration-element',
  templateUrl: './ms-decoration-element.component.html',
  styleUrls: ['./ms-decoration-element.component.css'],
})
export class MsDecorationElementComponent implements OnInit {
  private _element: MsDecorationElement | undefined;
  private _elemFlagEntries: ThesaurusEntry[] | undefined;
  private _elemColorEntries: ThesaurusEntry[] | undefined;
  private _elemGildingEntries: ThesaurusEntry[] | undefined;
  private _elemTechEntries: ThesaurusEntry[] | undefined;
  private _elemPosEntries: ThesaurusEntry[] | undefined;
  private _elemToolEntries: ThesaurusEntry[] | undefined;
  private _elemTypolEntries: ThesaurusEntry[] | undefined;

  @ViewChild('dsceditor', { static: false }) dscEditor: any;
  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  @Input()
  public get element(): MsDecorationElement | undefined {
    return this._element;
  }
  public set element(value: MsDecorationElement | undefined) {
    this._element = value;
    this.updateForm(value);
  }

  @Input()
  public parentKeys: string[] | undefined;

  @Output()
  public elementChange: EventEmitter<MsDecorationElement>;
  @Output()
  public editorClose: EventEmitter<any>;

  // general
  public type: FormControl;
  public flags: FormControl;
  public ranges: FormControl;
  public key: FormControl;
  public parentKey: FormControl;
  // typologies
  public typologies: FormControl;
  public subject: FormControl;
  public colors: FormControl;
  public gilding: FormControl;
  public technique: FormControl;
  public tool: FormControl;
  public position: FormControl;
  public lineHeight: FormControl;
  public textRelation: FormControl;
  // description
  public description: FormControl;
  public imageId: FormControl;
  public note: FormControl;
  public form: FormGroup;

  // ms-decoration-elem-types (required). All the other thesauri
  // (except decTypeHiddenEntries) have their entries filtered
  // by the value selected from this thesaurus.
  @Input()
  public decElemTypeEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-type-hidden
  @Input()
  public decTypeHiddenEntries: ThesaurusEntry[] | undefined;

  // ms-decoration-elem-flags
  @Input()
  public get decElemFlagEntries(): ThesaurusEntry[] | undefined {
    return this._elemFlagEntries;
  }
  public set decElemFlagEntries(value: ThesaurusEntry[] | undefined) {
    this._elemFlagEntries = value;
    this.elemFlagEntries = this.getFilteredEntries(value, this.type?.value);
  }

  // ms-decoration-elem-colors
  @Input()
  public get decElemColorEntries(): ThesaurusEntry[] | undefined {
    return this._elemColorEntries;
  }
  public set decElemColorEntries(value: ThesaurusEntry[] | undefined) {
    this._elemColorEntries = value;
    this.elemColorEntries = this.getFilteredEntries(value, this.type?.value);
  }

  // ms-decoration-elem-gildings
  @Input()
  public get decElemGildingEntries(): ThesaurusEntry[] | undefined {
    return this._elemGildingEntries;
  }
  public set decElemGildingEntries(value: ThesaurusEntry[] | undefined) {
    this._elemGildingEntries = value;
    this.elemGildingEntries = this.getFilteredEntries(value, this.type?.value);
  }

  // ms-decoration-elem-techniques
  @Input()
  public get decElemTechEntries(): ThesaurusEntry[] | undefined {
    return this._elemTechEntries;
  }
  public set decElemTechEntries(value: ThesaurusEntry[] | undefined) {
    this._elemTechEntries = value;
    this.elemTechEntries = this.getFilteredEntries(value, this.type?.value);
  }

  // ms-decoration-elem-positions
  @Input()
  public get decElemPosEntries(): ThesaurusEntry[] | undefined {
    return this._elemPosEntries;
  }
  public set decElemPosEntries(value: ThesaurusEntry[] | undefined) {
    this._elemPosEntries = value;
    this.elemPosEntries = this.getFilteredEntries(value, this.type?.value);
  }

  // ms-decoration-elem-tools
  @Input()
  public get decElemToolEntries(): ThesaurusEntry[] | undefined {
    return this._elemToolEntries;
  }
  public set decElemToolEntries(value: ThesaurusEntry[] | undefined) {
    this._elemToolEntries = value;
    this.elemToolEntries = this.getFilteredEntries(value, this.type?.value);
  }

  // ms-decoration-elem-typologies
  @Input()
  public get decElemTypolEntries(): ThesaurusEntry[] | undefined {
    return this._elemTypolEntries;
  }
  public set decElemTypolEntries(value: ThesaurusEntry[] | undefined) {
    this._elemTypolEntries = value;
    this.elemTypolEntries = this.getFilteredEntries(value, this.type?.value);
  }

  // the filtered entries:
  public elemFlagEntries: ThesaurusEntry[] | undefined;
  public elemColorEntries: ThesaurusEntry[] | undefined;
  public elemGildingEntries: ThesaurusEntry[] | undefined;
  public elemTechEntries: ThesaurusEntry[] | undefined;
  public elemPosEntries: ThesaurusEntry[] | undefined;
  public elemToolEntries: ThesaurusEntry[] | undefined;
  public elemTypolEntries: ThesaurusEntry[] | undefined;

  public elemGildingFree: boolean | undefined;
  public elemTechFree: boolean | undefined;
  public elemPosFree: boolean | undefined;
  public elemToolFree: boolean | undefined;
  public elemTypolFree: boolean | undefined;

  // this object has a property for each control
  // to be hidden, having the same name of the control
  // and value=true. Names you can use are: flags,
  // typologies, subject, colors, gilding, technique,
  // tool, position, lineHeight, textRelation.
  public hidden: any | undefined;

  constructor(
    formBuilder: FormBuilder,
    private _locService: MsLocationService
  ) {
    this.elementChange = new EventEmitter<MsDecorationElement>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.type = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.flags = formBuilder.control([]);
    this.ranges = formBuilder.control(null, [
      Validators.maxLength(100),
      Validators.pattern(MsLocationService.rangesRegexp),
    ]);
    this.key = formBuilder.control(null, [
      Validators.pattern('^[-a-zA-Z0-9_]+$'),
      Validators.maxLength(50),
    ]);
    this.parentKey = formBuilder.control(null, [
      Validators.pattern('^[-a-zA-Z0-9_]+$'),
      Validators.maxLength(50),
    ]);
    this.typologies = formBuilder.control([]);
    this.subject = formBuilder.control(null, Validators.maxLength(100));
    this.colors = formBuilder.control([]);
    this.gilding = formBuilder.control(null, Validators.maxLength(50));
    this.technique = formBuilder.control(null, Validators.maxLength(50));
    this.tool = formBuilder.control(null, Validators.maxLength(50));
    this.position = formBuilder.control(null, Validators.maxLength(50));
    this.lineHeight = formBuilder.control(0, Validators.min(0));
    this.textRelation = formBuilder.control(null, Validators.maxLength(100));
    this.description = formBuilder.control(null, Validators.maxLength(1000));
    this.imageId = formBuilder.control(null, Validators.maxLength(100));
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.form = formBuilder.group({
      type: this.type,
      flags: this.flags,
      ranges: this.ranges,
      key: this.key,
      parentKey: this.parentKey,
      typologies: this.typologies,
      subject: this.subject,
      colors: this.colors,
      gilding: this.gilding,
      technique: this.technique,
      tool: this.tool,
      position: this.position,
      lineHeight: this.lineHeight,
      textRelation: this.textRelation,
      description: this.description,
      imageId: this.imageId,
      note: this.note,
    });
  }

  /**
   * Determine if the specified thesaurus entries represent a free set.
   * This happens when we just have a single entry with a single dot
   * followed by "-".
   *
   * @param entries The thesaurus entries to test.
   * @returns True if the entries represent a free set.
   */
  private isFreeSet(entries: ThesaurusEntry[]): boolean {
    if (entries?.length !== 1) {
      return false;
    }
    const tokens = entries[0].id.split('.');
    return tokens.length === 2 && tokens[1] === '-';
  }

  private getFilteredEntries(
    entries: ThesaurusEntry[] | undefined,
    prefix: string
  ): ThesaurusEntry[] | undefined {
    if (!prefix || !entries?.some((e) => e.id.indexOf('.') > -1)) {
      return entries;
    }
    const p = prefix + '.';
    return entries.filter((e) => e.id.startsWith(p));
  }

  private updateVisibility(): void {
    const hidden = {};
    const entry = this.decTypeHiddenEntries?.find(
      (e) => e.id === this.type.value
    );
    if (entry) {
      const names = entry.value.split(' ').filter((s) => s);
      names.forEach((n) => {
        hidden[n] = true;
      });
    }
    this.hidden = hidden;
  }

  ngOnInit(): void {
    this.updateForm(this.element);
    this.onTabIndexChanged(0);

    // filter thesauri according to element's type
    this.type.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe(() => {
        // filter entries for multiple-selections
        this.elemFlagEntries = this.getFilteredEntries(
          this._elemFlagEntries,
          this.type?.value
        );
        this.elemColorEntries = this.getFilteredEntries(
          this._elemColorEntries,
          this.type?.value
        );

        // filter entries and set free for single-selections
        this.elemGildingEntries = this.getFilteredEntries(
          this._elemGildingEntries,
          this.type?.value
        );
        this.elemGildingFree = this.isFreeSet(this.elemGildingEntries);

        this.elemTechEntries = this.getFilteredEntries(
          this._elemTechEntries,
          this.type?.value
        );
        this.elemTechFree = this.isFreeSet(this.elemTechEntries);

        this.elemPosEntries = this.getFilteredEntries(
          this._elemPosEntries,
          this.type?.value
        );
        this.elemPosFree = this.isFreeSet(this.elemPosEntries);

        this.elemToolEntries = this.getFilteredEntries(
          this._elemToolEntries,
          this.type?.value
        );
        this.elemToolFree = this.isFreeSet(this.elemToolEntries);

        this.elemTypolEntries = this.getFilteredEntries(
          this._elemTypolEntries,
          this.type?.value
        );
        this.elemTypolFree = this.isFreeSet(this.elemTypolEntries);

        // visibility
        this.updateVisibility();
      });
  }

  public onTabIndexChanged(index: number): void {
    // HACK
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    // https://stackoverflow.com/questions/37412950/ngx-monaco-editor-unable-to-set-layout-size-when-container-changes-using-tab
    if (index === 2) {
      setTimeout(() => {
        this.dscEditor?._editor?.layout();
      }, 150);
    }
  }

  private updateForm(element: MsDecorationElement | undefined): void {
    if (!element) {
      this.form.reset();
      return;
    }
    // general
    this.type.setValue(element.type);
    this.flags.setValue(element.flags);
    this.ranges.setValue(
      element.ranges
        ? element.ranges
            .map((r) => {
              return this._locService.rangeToString(r);
            })
            .join(' ')
        : null
    );
    this.key.setValue(element.key);
    this.parentKey.setValue(element.parentKey);
    // typologies
    this.typologies.setValue(element.typologies);
    this.subject.setValue(element.subject);
    this.colors.setValue(element.colors);
    this.gilding.setValue(element.gilding);
    this.technique.setValue(element.technique);
    this.tool.setValue(element.tool);
    this.position.setValue(element.position);
    this.lineHeight.setValue(element.lineHeight);
    this.textRelation.setValue(element.textRelation);
    // description
    this.description.setValue(element.description);
    this.imageId.setValue(element.imageId);
    this.note.setValue(element.note);

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

  private getElement(): MsDecorationElement | null {
    return {
      type: this.type.value?.trim(),
      flags: this.flags.value?.length ? this.flags.value : undefined,
      ranges: this.parseRanges(this.ranges.value),
      key: this.key.value?.trim(),
      parentKey: this.parentKey.value?.trim(),
      typologies: this.typologies.value?.length
        ? this.typologies.value
        : undefined,
      subject: this.subject.value?.trim(),
      colors: this.colors.value?.length ? this.colors.value : undefined,
      gilding: this.gilding.value?.trim(),
      technique: this.technique.value?.trim(),
      tool: this.tool.value?.trim(),
      position: this.position.value?.trim(),
      lineHeight: this.lineHeight.value,
      textRelation: this.textRelation.value?.trim(),
      description: this.description.value?.trim(),
      imageId: this.imageId.value?.trim(),
      note: this.note.value?.trim(),
    };
  }

  public onFlgSelectionChange(ids: string[]): void {
    this.flags.setValue(ids);
    this.form.markAsDirty();
  }

  public onTypSelectionChange(ids: string[]): void {
    this.typologies.setValue(ids);
    this.form.markAsDirty();
  }

  public onClrSelectionChange(ids: string[]): void {
    this.colors.setValue(ids);
    this.form.markAsDirty();
  }

  public typeIdToString(id: string): string {
    const entry = this.decElemTypeEntries?.find((e) => e.id === id);
    return entry ? entry.value : id;
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    const element = this.getElement();
    if (!element) {
      return;
    }
    this.elementChange.emit(element);
  }
}
