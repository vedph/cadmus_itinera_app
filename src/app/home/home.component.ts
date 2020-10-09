import { Component } from '@angular/core';
import { EnvService } from '@myrmidon/cadmus-core';
import { AuthService } from '@myrmidon/cadmus-api';
import { BehaviorSubject } from 'rxjs';
import { DocReference } from 'projects/myrmidon/cadmus-itinera-core/src/lib/models';

@Component({
  selector: 'cadmus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public title: string;
  public logged: boolean;

  public references$: BehaviorSubject<DocReference[]>;

  constructor(env: EnvService, authService: AuthService) {
    this.title = env.name;
    this.logged = authService.currentUserValue !== null;

    this.references$ = new BehaviorSubject<DocReference[]>(
      [
        {
          tag: 'tag',
          author: 'Chantraine',
          work: 'EtGr',
          location: '1.23',
          note: 'wow, that\'s a note!'
        }
      ]
    );
  }

  public onReferencesChange(model: DocReference[]): void {
    console.log(JSON.stringify(model));
  }
}
