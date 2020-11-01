import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditLetterInfoPartService } from './edit-letter-info-part.service';
import { EditLetterInfoPartQuery } from './edit-letter-info-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cadmus-letter-info-part-feature',
  templateUrl: './letter-info-part-feature.component.html',
  styleUrls: ['./letter-info-part-feature.component.css'],
})
export class LetterInfoPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditLetterInfoPartQuery,
    editPartService: EditLetterInfoPartService,
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
    this.initEditor(['languages']);
  }
}
