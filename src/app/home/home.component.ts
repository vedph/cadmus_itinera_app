import { Component } from '@angular/core';
import { EnvService, Thesaurus } from '@myrmidon/cadmus-core';
import { AuthService } from '@myrmidon/cadmus-api';

@Component({
  selector: 'cadmus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public title: string;
  public logged: boolean;

  public typeThesaurus: Thesaurus;

  constructor(env: EnvService, authService: AuthService) {
    this.title = env.name;
    this.logged = authService.currentUserValue !== null;

    this.typeThesaurus = {
      id: 'types',
      language: 'eng',
      entries: [
        { id: 'title', value: 'title' },
        { id: 'first', value: 'first' },
        { id: 'last', value: 'last' },
      ]
    };
  }
}
