import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditCorrExchangesPartService } from './edit-corr-exchanges-part.service';
import { EditCorrExchangesPartQuery } from './edit-corr-exchanges-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-corr-exchanges-part-feature',
  templateUrl: './corr-exchanges-part-feature.component.html',
  styleUrls: ['./corr-exchanges-part-feature.component.css'],
})
export class CorrExchangesPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditCorrExchangesPartQuery,
    editPartService: EditCorrExchangesPartService,
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
    this.initEditor(['doc-reference-tags', 'epist-attachment-types']);
  }
}
