import { Component, OnInit } from '@angular/core';
import {
  DocReference,
  PersonName,
} from 'projects/myrmidon/cadmus-itinera-core/src/lib/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sub-editors-demo',
  templateUrl: './sub-editors-demo.component.html',
  styleUrls: ['./sub-editors-demo.component.css'],
})
export class SubEditorsDemoComponent implements OnInit {
  public personName$: BehaviorSubject<PersonName>;
  public lastPersonName: PersonName;

  public externalIds$: BehaviorSubject<string[]>;
  public lastExternalIds: string[];

  public references$: BehaviorSubject<DocReference[]>;
  public lastReferences: DocReference[];

  constructor() {}

  ngOnInit(): void {
    this.personName$ = new BehaviorSubject<PersonName>({
      language: 'lat',
      tag: 'free',
      parts: [
        { type: 'praenomen', value: 'Publius' },
        { type: 'nomen', value: 'Vergilius' },
        { type: 'cognomen', value: 'Maro' },
      ],
    });

    this.externalIds$ = new BehaviorSubject<string[]>([
      'http://www.google.com',
      'id-1234',
    ]);

    this.references$ = new BehaviorSubject<DocReference[]>([
      {
        tag: 'tag',
        author: 'Chantraine',
        work: 'EtGr',
        location: '1.23',
        note: "wow, that's a note!",
      },
    ]);
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
}
