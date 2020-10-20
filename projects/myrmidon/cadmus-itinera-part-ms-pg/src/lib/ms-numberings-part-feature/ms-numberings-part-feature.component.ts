import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditMsNumberingsPartQuery } from './edit-ms-numberings-part.query';
import { EditMsNumberingsPartService } from './edit-ms-numberings-part.service';

@Component({
  selector: 'lib-ms-numberings-part-feature',
  templateUrl: './ms-numberings-part-feature.component.html',
  styleUrls: ['./ms-numberings-part-feature.component.css'],
})
export class MsNumberingsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsNumberingsPartQuery,
    editPartService: EditMsNumberingsPartService,
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
      'ms-numbering-eras',
      'ms-numbering-systems',
      'ms-numbering-techniques',
      'ms-numbering-positions',
    ]);
  }
}
