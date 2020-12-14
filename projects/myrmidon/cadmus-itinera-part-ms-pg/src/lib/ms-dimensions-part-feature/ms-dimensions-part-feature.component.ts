import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditMsDimensionsPartQuery } from './edit-ms-dimensions-part.query';
import { EditMsDimensionsPartService } from './edit-ms-dimensions-part.service';

@Component({
  selector: 'itinera-ms-dimensions-part-feature',
  templateUrl: './ms-dimensions-part-feature.component.html',
  styleUrls: ['./ms-dimensions-part-feature.component.css'],
})
export class MsDimensionsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsDimensionsPartQuery,
    editPartService: EditMsDimensionsPartService,
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
    this.initEditor(['physical-size-units', 'ms-dimensions', 'ms-counts']);
  }
}
