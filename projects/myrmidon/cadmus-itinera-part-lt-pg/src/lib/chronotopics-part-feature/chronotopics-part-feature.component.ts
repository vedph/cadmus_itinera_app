import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditChronotopicsPartService } from './edit-Chronotopics-part.service';
import { EditChronotopicsPartQuery } from './edit-Chronotopics-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-chronotopics-part-feature',
  templateUrl: './chronotopics-part-feature.component.html',
  styleUrls: ['./chronotopics-part-feature.component.css'],
})
export class ChronotopicsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditChronotopicsPartQuery,
    editPartService: EditChronotopicsPartService,
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
