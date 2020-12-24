import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditMsLayoutsPartQuery } from './edit-ms-layouts-part.query';
import { EditMsLayoutsPartService } from './edit-ms-layouts-part.service';

@Component({
  selector: 'itinera-ms-layouts-part-feature',
  templateUrl: './ms-layouts-part-feature.component.html',
  styleUrls: ['./ms-layouts-part-feature.component.css'],
})
export class MsLayoutsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsLayoutsPartQuery,
    editPartService: EditMsLayoutsPartService,
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
      'ms-counts',
      'ms-dimensions',
      'ms-ruling-techniques',
      'physical-size-units',
    ]);
  }
}
