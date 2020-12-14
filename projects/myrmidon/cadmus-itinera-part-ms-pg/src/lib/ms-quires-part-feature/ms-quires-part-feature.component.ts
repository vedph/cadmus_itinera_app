import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditMsQuiresPartQuery } from './edit-ms-quires-part.query';
import { EditMsQuiresPartService } from './edit-ms-quires-part.service';

@Component({
  selector: 'itinera-ms-quires-part-feature',
  templateUrl: './ms-quires-part-feature.component.html',
  styleUrls: ['./ms-quires-part-feature.component.css'],
})
export class MsQuiresPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsQuiresPartQuery,
    editPartService: EditMsQuiresPartService,
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
    this.initEditor(null);
  }
}
