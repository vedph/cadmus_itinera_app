import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditPersonEventsPartService } from './edit-person-events-part.service';
import { EditPersonEventsPartQuery } from './edit-person-events-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-person-events-part-feature',
  templateUrl: './person-events-part-feature.component.html',
  styleUrls: ['./person-events-part-feature.component.css'],
})
export class PersonEventsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditPersonEventsPartQuery,
    editPartService: EditPersonEventsPartService,
    editItemQuery: EditItemQuery,
    editItemService: EditItemService
  ) {
    super(
      router,
      route,
      snackbar,
      editPartQuery,
      editPartService,
      editItemQuery,
      editItemService
    );
  }

  public ngOnInit(): void {
    this.initEditor(['bio-event-types', 'event-participant-tags']);
  }
}
