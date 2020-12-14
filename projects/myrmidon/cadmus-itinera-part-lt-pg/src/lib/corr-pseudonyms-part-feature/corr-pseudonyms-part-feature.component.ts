import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditCorrPseudonymsPartService } from './edit-corr-pseudonyms-part.service';
import { EditCorrPseudonymsPartQuery } from './edit-corr-pseudonyms-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-corr-pseudonyms-part-feature',
  templateUrl: './corr-pseudonyms-part-feature.component.html',
  styleUrls: ['./corr-pseudonyms-part-feature.component.css'],
})
export class CorrPseudonymsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditCorrPseudonymsPartQuery,
    editPartService: EditCorrPseudonymsPartService,
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
    this.initEditor(['languages', 'doc-reference-tags']);
  }
}
