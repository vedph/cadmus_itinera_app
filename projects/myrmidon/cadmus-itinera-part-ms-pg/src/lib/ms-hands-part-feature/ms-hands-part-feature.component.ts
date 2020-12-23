import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditMsHandsPartQuery } from './edit-ms-hands-part.query';
import { EditMsHandsPartService } from './edit-ms-hands-part.service';

@Component({
  selector: 'itinera-ms-hands-part-feature',
  templateUrl: './ms-hands-part-feature.component.html',
  styleUrls: ['./ms-hands-part-feature.component.css'],
})
export class MsHandsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsHandsPartQuery,
    editPartService: EditMsHandsPartService,
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
      'ms-hand-id-reasons',
      'ms-hand-types',
      'ms-hand-sign-types',
      'ms-rubrication-types',
      'ms-languages',
    ]);
  }
}
