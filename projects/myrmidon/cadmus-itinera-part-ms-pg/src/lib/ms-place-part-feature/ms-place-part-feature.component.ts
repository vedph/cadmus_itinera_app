import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ThesauriSet } from '@myrmidon/cadmus-core';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditMsPlacePartService } from './edit-ms-place-part.service';
import { EditMsPlacePartQuery } from './edit-ms-place-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-ms-place-part-feature',
  templateUrl: './ms-place-part-feature.component.html',
  styleUrls: ['./ms-place-part-feature.component.css'],
})
export class MsPlacePartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsPlacePartQuery,
    editPartService: EditMsPlacePartService,
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
    this.initEditor(['ms-place-areas', 'doc-reference-tags']);
  }
}
