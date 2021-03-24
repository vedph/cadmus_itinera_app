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
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  MsDecorationElement,
  MsLocationRange,
  MsLocationService,
} from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-ms-decoration-element',
  templateUrl: './ms-decoration-element.component.html',
  styleUrls: ['./ms-decoration-element.component.css'],
})
export class MsDecorationElementComponent implements OnInit {
  private _element: MsDecorationElement | undefined;

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

  // ms-decoration-elem-types (required)
  @Input()
  public decElemTypeEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-flags
  @Input()
  public decElemFlagEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-colors
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
  // ms-decoration-type-hidden
  @Input()
  public decTypeDepEntries: ThesaurusEntry[] | undefined;

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

  ngOnInit(): void {
    this.updateForm(this.element);
    this.onTabIndexChanged(0);
    // TODO handle type change
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

  private buildSwitches(
    ids: string[] | undefined,
    entries: ThesaurusEntry[] | undefined
  ): boolean[] {
    if (!entries) {
      return [];
    }
    const switches: boolean[] = [];
    entries.forEach((entry) => {
      switches.push(ids?.includes(entry.id));
    });
    return switches;
  }

  private updateForm(element: MsDecorationElement | undefined): void {
    if (!element) {
      this.form.reset();
      return;
    }
    // general
    this.type.setValue(element.type);
    this.flags.setValue(
      this.buildSwitches(element.flags, this.decElemFlagEntries)
    );
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
    this.colors.setValue(
      this.buildSwitches(element.colors, this.decElemColorEntries)
    );
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
      lineHeight: this.lineHeight.value?.trim(),
      textRelation: this.textRelation.value?.trim(),
      description: this.description.value?.trim(),
      imageId: this.imageId.value?.trim(),
      note: this.note.value?.trim(),
    };
  }

  public onFlgSelectionChange(
    list: MatSelectionList,
    change: MatSelectionListChange
  ): void {
    const ids: string[] = [];
    for (let i = 0; i < change.options.length; i++) {
      if (change.options[i].value) {
        ids.push(this.decElemFlagEntries[i].id);
      }
    }
    this.flags.setValue(ids);
    this.form.markAsDirty();
  }

  public onTypSelectionChange(change: MatSelectionListChange): void {
    this.typologies.setValue(change.options.map((o) => o.value));
    this.form.markAsDirty();
  }

  public onClrSelectionChange(change: MatSelectionListChange): void {
    this.colors.setValue(change.options.map((o) => o.value));
    this.form.markAsDirty();
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
