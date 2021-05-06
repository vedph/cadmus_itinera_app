import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { MatSnackBar } from '@angular/material/snack-bar';
import { EditPersonWorksPartQuery } from './edit-person-works-part.service';
import { EditPersonWorksPartService } from './edit-person-works-part.query';

@Component({
  selector: 'itinera-person-works-part-feature',
  templateUrl: './person-works-part-feature.component.html',
  styleUrls: ['./person-works-part-feature.component.css'],
})
export class PersonWorksPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditPersonWorksPartQuery,
    editPartService: EditPersonWorksPartService,
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
    this.initEditor([
      'person-work-languages',
      'person-work-genres',
      'doc-reference-tags',
      'chronotope-tags',
    ]);
  }
}
