import { Component, OnInit } from '@angular/core';
import { EnvService, Thesaurus } from '@myrmidon/cadmus-core';
import { AuthService } from '@myrmidon/cadmus-api';
import { PersonName } from 'dist/myrmidon/cadmus-itinera-core/lib/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cadmus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public title: string;
  public logged: boolean;

  public typeThesaurus: Thesaurus;
  public langThesaurus: Thesaurus;
  public person$: BehaviorSubject<PersonName>;

  public ids$: BehaviorSubject<string[]>;

  constructor(env: EnvService, authService: AuthService) {
    this.title = env.name;
    this.logged = authService.currentUserValue !== null;

    this.typeThesaurus = {
      id: 'types',
      language: 'eng',
      entries: [
        { id: 'praenomen', value: 'praenomen' },
        { id: 'nomen', value: 'nomen' },
        { id: 'cognomen', value: 'cognomen' },
      ],
    };
    this.langThesaurus = {
      id: 'languages',
      language: 'eng',
      entries: [
        { id: 'eng', value: 'English' },
        { id: 'lat', value: 'Latin' },
        { id: 'grc', value: 'Greek' },
      ],
    };
  }

  public ngOnInit(): void {
    this.person$ = new BehaviorSubject<PersonName>({
      language: 'lat',
      tag: 'sample',
      parts: [
        { type: 'praenomen', value: 'Publius' },
        { type: 'nomen', value: 'Vergilius' },
        { type: 'cognomen', value: 'Maro' },
      ],
    });

    this.ids$ = new BehaviorSubject<string[]>([
      'hello',
      'http://www.fusisoft.net',
      'world',
    ]);
  }

  public onPersonChange(person: PersonName) {
    console.log(JSON.stringify(person));
  }

  public onIdsChange(ids: string[]) {
    console.log(JSON.stringify(ids));
  }
}
