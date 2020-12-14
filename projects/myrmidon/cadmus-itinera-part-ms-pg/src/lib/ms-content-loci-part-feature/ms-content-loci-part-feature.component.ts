import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditMsContentLociPartQuery } from './edit-ms-content-loci-part.query';
import { EditMsContentLociPartService } from './edit-ms-content-loci-part.service';

@Component({
  selector: 'itinera-ms-content-loci-part-feature',
  templateUrl: './ms-content-loci-part-feature.component.html',
  styleUrls: ['./ms-content-loci-part-feature.component.css'],
})
export class MsContentLociPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsContentLociPartQuery,
    editPartService: EditMsContentLociPartService,
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
