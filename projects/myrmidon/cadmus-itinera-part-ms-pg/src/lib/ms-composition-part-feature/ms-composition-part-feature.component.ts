import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditMsCompositionPartService } from './edit-ms-composition-part.service';
import { EditMsCompositionPartQuery } from './edit-ms-composition-part.query';

@Component({
  selector: 'itinera-ms-composition-part-feature',
  templateUrl: './ms-composition-part-feature.component.html',
  styleUrls: ['./ms-composition-part-feature.component.css'],
})
export class MsCompositionPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsCompositionPartQuery,
    editPartService: EditMsCompositionPartService,
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
    this.initEditor(['ms-materials']);
  }
}
