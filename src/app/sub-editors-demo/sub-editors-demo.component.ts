import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  HistoricalDate,
  HistoricalDateModel,
  ThesaurusEntry,
  DocReference,
  PhysicalDimension,
  PhysicalSize,
} from '@myrmidon/cadmus-core';
import {
  Chronotope,
  CitedPerson,
  DecoratedCount,
  MsLayoutService,
  MS_LAYOUT_FORMULA_REGEX,
} from '@myrmidon/cadmus-itinera-core';
import { NoteSet } from '@myrmidon/cadmus-itinera-ui';
import { DecoratedId, PersonName } from '@myrmidon/cadmus-itinera-core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MsLayoutRectSet } from '@myrmidon/cadmus-itinera-ui';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-sub-editors-demo',
  templateUrl: './sub-editors-demo.component.html',
  styleUrls: ['./sub-editors-demo.component.css'],
})
export class SubEditorsDemoComponent implements OnInit {
  public date: HistoricalDateModel;

  public initialPersonName: PersonName | undefined;
  public lastPersonName: PersonName | undefined;
  public langEntries: ThesaurusEntry[] | undefined;
  public namePartTypeEntries: ThesaurusEntry[] | undefined;

  public initialExternalIds: string[];
  public lastExternalIds: string[];

  public initialReferences: DocReference[];
  public lastReferences: DocReference[];

  public lastDecoratedIds: DecoratedId[];

  public initialDecoratedCounts: DecoratedCount[];
  public lastDecoratedCounts: DecoratedCount[];

  public initialCitedPerson: CitedPerson;
  public lastCitedPerson: CitedPerson;

  public lastChronotope: Chronotope;

  public dimension: PhysicalDimension;

  public unitEntries: ThesaurusEntry[] | undefined;
  public size: PhysicalSize;

  public set: NoteSet;
  public lastNote: KeyValue<string, string>;

  public selectedIds: string[] | undefined;

  public free: FormControl;
  public id: string | undefined;
  public teValidators: ValidatorFn[];

  public rectSet: MsLayoutRectSet;
  public figHeight = 400;
  public formulaError: string | undefined;
  public figFormula: FormControl;
  public figForm: FormGroup;
  public dimensions: string[] | undefined;

  constructor(
    formBuilder: FormBuilder,
    private _msLayoutService: MsLayoutService
  ) {
    this.free = formBuilder.control(false);
    this.teValidators = [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern('^[-a-zA-Z_0-9]+$'),
    ];

    // fig
    this.figFormula = formBuilder.control(
      '250 × 160 = 30 / 5 [170 / 5] 40 × 15 / [5 / 50 / 5* (20) 5 / 40] 5 / 15',
      [Validators.required, Validators.pattern(MS_LAYOUT_FORMULA_REGEX)]
    );
    this.figForm = formBuilder.group({
      figFormula: this.figFormula,
    });
  }

  ngOnInit(): void {
    this.langEntries = [
      { id: 'ita', value: 'Italian' },
      { id: 'eng', value: 'English' },
      { id: 'fra', value: 'French' },
      { id: 'spa', value: 'Spanish' },
      { id: 'ger', value: 'German' },
      { id: 'lat', value: 'Latin' },
      { id: 'grc', value: 'Greek' },
      { id: 'gre', value: 'Modern Greek' },
    ];
    this.namePartTypeEntries = [
      { id: 'first', value: 'first' },
      { id: 'last', value: 'last' },
      { id: 'name', value: 'name' },
      { id: 'title', value: 'title' },
      { id: 'praenomen', value: 'praenomen' },
      { id: 'nomen', value: 'nomen' },
      { id: 'cognomen', value: 'cognomen' },
    ];

    this.date = HistoricalDate.parse('c. 1260 AD');

    this.initialPersonName = {
      language: 'lat',
      tag: 'free',
      parts: [
        { type: 'praenomen', value: 'Publius' },
        { type: 'nomen', value: 'Vergilius' },
        { type: 'cognomen', value: 'Maro' },
      ],
    };

    this.initialCitedPerson = {
      name: {
        language: 'lat',
        tag: 'free',
        parts: [
          { type: 'praenomen', value: 'Publius' },
          { type: 'nomen', value: 'Vergilius' },
          { type: 'cognomen', value: 'Maro' },
        ],
      },
      rank: 1,
      ids: [
        {
          id: 'i1',
          rank: 1,
          tag: 'tag',
          sources: [
            {
              tag: 'tag',
              author: 'Chantraine',
              work: 'EtGr',
              location: '1.23',
              note: "wow, that's a note!",
            },
          ],
        },
      ],
      sources: [
        {
          tag: 'tag',
          author: 'Allen',
          work: 'Wk',
          location: '245',
        },
      ],
    };

    this.initialExternalIds = ['http://www.google.com', 'id-1234'];

    this.initialReferences = [
      {
        tag: 'tag',
        author: 'Chantraine',
        work: 'EtGr',
        location: '1.23',
        note: "wow, that's a note!",
      },
    ];

    this.initialDecoratedCounts = [
      {
        id: 'sheets',
        value: 32,
        note: 'a note here.',
      },
      {
        id: 'guard-sheets',
        value: 2,
      },
    ];

    this.unitEntries = [
      { id: 'mm', value: 'mm' },
      { id: 'cm', value: 'cm' },
      { id: 'mt', value: 'mt' },
    ];
    this.size = {
      tag: 'A4',
      w: { value: 21, unit: 'cm' },
      h: { value: 29.7, unit: 'cm' },
    };

    this.set = {
      definitions: [
        {
          key: 'a',
          label: 'alpha',
          required: true,
          maxLength: 50,
        },
        {
          key: 'b',
          label: 'beta',
          markdown: true,
          maxLength: 100,
        },
        {
          key: 'g',
          label: 'gamma',
        },
      ],
      notes: new Map<string, string>([
        ['a', 'This is note alpha.'],
        ['b', 'This is note __beta__, which uses _Markdown_.'],
      ]),
    };

    this.selectedIds = ['eng', 'ita', 'lat'];

    // const map = this._msLayoutService.parseFormula(
    //   '250 × 160 = 30 / 5 [170 / 5] 40 × 15 / [5 / 50 / 5* (20) 5 / 40] 5 / 15'
    // ).value;
    // this.rectSet = {
    //   height: this._msLayoutService.getHeightRects(map),
    //   width: this._msLayoutService.getWidthRects(map),
    //   gap: 4,
    // };
  }

  public onPersonNameChange(model: PersonName): void {
    this.lastPersonName = model;
  }

  public onExternalIdsChange(model: string[]): void {
    this.lastExternalIds = model;
  }

  public onReferencesChange(model: DocReference[]): void {
    this.lastReferences = model;
  }

  public onIdsChange(model: DecoratedId[]): void {
    this.lastDecoratedIds = model;
  }

  public onDecoratedCountsChange(model: DecoratedCount[]): void {
    this.lastDecoratedCounts = model;
  }

  public onCitedPersonChange(model: CitedPerson): void {
    this.lastCitedPerson = model;
  }

  public onChronotopeChange(model: Chronotope): void {
    this.lastChronotope = model;
  }

  public onNoteChange(model: KeyValue<string, string>): void {
    this.lastNote = model;
  }

  public onMultiSelectionChange(selectedIds: string[]): void {
    this.selectedIds = selectedIds;
  }

  public onIdChange(id: string | undefined): void {
    this.id = id;
  }

  private getHW(rectSet: MsLayoutRectSet): { height: number; width: number } {
    return {
      height: rectSet.height.reduce((a, b) => {
        return a + b.value;
      }, 0),
      width: rectSet.width.reduce((a, b) => {
        return a + b.value;
      }, 0),
    };
  }

  public applyLayoutFormula(): void {
    if (this.figForm.invalid) {
      return;
    }
    const result = this._msLayoutService.parseFormula(this.figFormula.value);
    if (result.error) {
      this.formulaError = result.error.message;
      return;
    } else {
      this.formulaError = undefined;
    }

    // get rectangles
    const map: Map<string, number> = result.value;
    this.rectSet = {
      height: this._msLayoutService.getHeightRects(map),
      width: this._msLayoutService.getWidthRects(map),
      gap: 4,
    };

    // check
    const hw = this.getHW(this.rectSet);
    const sb: string[] = [];
    const expHeight = map.get('height');
    const expWidth = map.get('width');
    if (hw.height !== expHeight) {
      sb.push(`expected (${expHeight}) and actual (${hw.height}) height`);
    }
    if (hw.width !== expWidth) {
      sb.push(`expected (${expWidth}) and actual (${hw.width}) width`);
    }
    if (sb.length) {
      sb.splice(0, 0, 'Mismatch: ');
      this.formulaError = sb.join('');
    }

    // get sorted keys and add dimensions in order
    const sortedKeys = this._msLayoutService.getSortedKeys(
      this._msLayoutService.getColumnCount(map),
      map
    );
    const dimensions: string[] = [];
    sortedKeys.forEach((key) => {
      dimensions.push(`${key}=${map.get(key)}`);
    });
    this.dimensions = dimensions;
  }

  public onFigSliderChange(change: MatSliderChange): void {
    this.figHeight = change.value;
  }
}
