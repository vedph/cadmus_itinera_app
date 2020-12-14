import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditMsMaterialDscPartService } from './edit-ms-material-dsc-part.service';
import { EditMsMaterialDscPartQuery } from './edit-ms-material-dsc-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-ms-material-dsc-part-feature',
  templateUrl: './ms-material-dsc-part-feature.component.html',
  styleUrls: ['./ms-material-dsc-part-feature.component.css'],
})
export class MsMaterialDscPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsMaterialDscPartQuery,
    editPartService: EditMsMaterialDscPartService,
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
    this.initEditor(['ms-materials', 'ms-formats', 'ms-states']);
  }
}
