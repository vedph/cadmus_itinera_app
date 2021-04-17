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
} from '@myrmidon/cadmus-itinera-core';
import { NoteSet } from '@myrmidon/cadmus-itinera-ui';
import { DecoratedId, PersonName } from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sub-editors-demo',
  templateUrl: './sub-editors-demo.component.html',
  styleUrls: ['./sub-editors-demo.component.css'],
})
export class SubEditorsDemoComponent implements OnInit {
  public date: HistoricalDateModel;

  public initialPersonName: PersonName | undefined;
  public lastPersonName: PersonName | undefined;
  public langEntries: ThesaurusEntry[];
  public namePartTypeEntries: ThesaurusEntry[];

  public initialExternalIds: string[];
  public lastExternalIds: string[];

  public initialReferences: DocReference[];
  public lastReferences: DocReference[];

  public lastDecoratedIds: DecoratedId[];

  public decoratedCounts$: BehaviorSubject<DecoratedCount[]>;
  public lastDecoratedCounts: DecoratedCount[];

  public initialCitedPerson: CitedPerson;
  public lastCitedPerson: CitedPerson;

  public lastChronotope: Chronotope;

  public dimension: PhysicalDimension;

  public unitEntries: ThesaurusEntry[];
  public size: PhysicalSize;

  public set: NoteSet;
  public lastNote: KeyValue<string, string>;

  public selectedIds: string[] | undefined;

  public free: FormControl;
  public id: string | undefined;
  public teValidators: ValidatorFn[];

  constructor(formBuilder: FormBuilder) {
    this.free = formBuilder.control(false);
    this.teValidators = [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern('^[-a-zA-Z_0-9]+$'),
    ];
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

    this.decoratedCounts$ = new BehaviorSubject<DecoratedCount[]>([
      {
        id: 'sheets',
        value: 32,
        note: 'a note here.',
      },
      {
        id: 'guard-sheets',
        value: 2,
      },
    ]);

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
}
