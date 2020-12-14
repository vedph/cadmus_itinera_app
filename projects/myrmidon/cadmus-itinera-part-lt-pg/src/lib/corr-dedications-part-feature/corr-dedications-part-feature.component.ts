import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditCorrDedicationsPartService } from './edit-corr-dedications-part.service';
import { EditCorrDedicationsPartQuery } from './edit-corr-dedications-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-corr-dedications-part-feature',
  templateUrl: './corr-dedications-part-feature.component.html',
  styleUrls: ['./corr-dedications-part-feature.component.css'],
})
export class CorrDedicationsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditCorrDedicationsPartQuery,
    editPartService: EditCorrDedicationsPartService,
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
