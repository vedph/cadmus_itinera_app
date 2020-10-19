import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditMsWatermarksPartService } from './edit-ms-watermarks-part.service';
import { EditMsWatermarksPartQuery } from './edit-ms-watermarks-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cadmus-ms-watermarks-part-feature',
  templateUrl: './ms-watermarks-part-feature.component.html',
  styleUrls: ['./ms-watermarks-part-feature.component.css'],
})
export class MsWatermarksPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsWatermarksPartQuery,
    editPartService: EditMsWatermarksPartService,
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
    this.initEditor(['ms-watermark-subjects']);
  }
}
