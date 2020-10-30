import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditCitedPersonsPartService } from './edit-cited-persons-part.service';
import { EditCitedPersonsPartQuery } from './edit-cited-persons-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cadmus-cited-persons-part-feature',
  templateUrl: './cited-persons-part-feature.component.html',
  styleUrls: ['./cited-persons-part-feature.component.css'],
})
export class CitedPersonsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditCitedPersonsPartQuery,
    editPartService: EditCitedPersonsPartService,
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
    this.initEditor(['doc-reference-tags']);
  }
}
