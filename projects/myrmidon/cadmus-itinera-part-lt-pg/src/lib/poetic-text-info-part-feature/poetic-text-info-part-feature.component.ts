import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditPoeticTextInfoPartService } from './edit-poetic-text-info-part.service';
import { EditPoeticTextInfoPartQuery } from './edit-poetic-text-info-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-poetic-text-info-part-feature',
  templateUrl: './poetic-text-info-part-feature.component.html',
  styleUrls: ['./poetic-text-info-part-feature.component.css'],
})
export class PoeticTextInfoPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditPoeticTextInfoPartQuery,
    editPartService: EditPoeticTextInfoPartService,
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
      'languages',
      'person-name-types',
      'person-name-tags',
      'person-id-tags',
      'text-metres',
      'doc-reference-tags',
    ]);
  }
}
