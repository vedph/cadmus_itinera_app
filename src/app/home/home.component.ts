import { Component } from '@angular/core';
import { EnvService } from '@myrmidon/cadmus-core';
import { AuthService } from '@myrmidon/cadmus-api';

@Component({
  selector: 'cadmus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public title: string;
  public logged: boolean;

  constructor(env: EnvService, authService: AuthService) {
    this.logged = authService.currentUserValue !== null;
  }
}
