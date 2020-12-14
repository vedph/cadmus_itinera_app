import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditPersonHandPartService } from './edit-person-hand-part.service';
import { EditPersonHandPartQuery } from './edit-person-hand-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-person-hand-part-feature',
  templateUrl: './person-hand-part-feature.component.html',
  styleUrls: ['./person-hand-part-feature.component.css'],
})
export class PersonHandPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditPersonHandPartQuery,
    editPartService: EditPersonHandPartService,
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
    this.initEditor(['ms-hand-types', 'ms-hand-jobs', 'ms-hand-sign-types']);
  }
}
