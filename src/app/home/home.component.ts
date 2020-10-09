import { Component } from '@angular/core';
import { EnvService } from '@myrmidon/cadmus-core';
import { AuthService } from '@myrmidon/cadmus-api';
import { BehaviorSubject } from 'rxjs';
import {
  DocReference,
  PersonName,
} from 'projects/myrmidon/cadmus-itinera-core/src/lib/models';

@Component({
  selector: 'cadmus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public title: string;
  public logged: boolean;

  public personName$: BehaviorSubject<PersonName>;
  public externalIds$: BehaviorSubject<string[]>;
  public references$: BehaviorSubject<DocReference[]>;

  constructor(env: EnvService, authService: AuthService) {
    this.title = env.name;
    this.logged = authService.currentUserValue !== null;

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
        note: 'wow, that\'s a note!',
      },
    ]);
  }

  public onPersonNameChange(model: PersonName): void {
    console.log(JSON.stringify(model));
  }

  public onExternalIdsChange(model: string[]): void {
    console.log(JSON.stringify(model));
  }

  public onReferencesChange(model: DocReference[]): void {
    console.log(JSON.stringify(model));
  }
}
