import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditLitDedicationsPartService } from './edit-lit-dedications-part.service';
import { EditLitDedicationsPartQuery } from './edit-lit-dedications-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-lit-dedications-part-feature',
  templateUrl: './lit-dedications-part-feature.component.html',
  styleUrls: ['./lit-dedications-part-feature.component.css'],
})
export class LitDedicationsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditLitDedicationsPartQuery,
    editPartService: EditLitDedicationsPartService,
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
