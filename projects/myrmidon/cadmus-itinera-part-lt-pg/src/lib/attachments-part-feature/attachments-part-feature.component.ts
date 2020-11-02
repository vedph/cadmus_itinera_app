import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditAttachmentsPartService } from './edit-Attachments-part.service';
import { EditAttachmentsPartQuery } from './edit-Attachments-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cadmus-attachments-part-feature',
  templateUrl: './attachments-part-feature.component.html',
  styleUrls: ['./attachments-part-feature.component.css'],
})
export class AttachmentsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditAttachmentsPartQuery,
    editPartService: EditAttachmentsPartService,
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
    this.initEditor(['epist-attachment-types']);
  }
}
