import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ThesauriSet } from '@myrmidon/cadmus-core';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditMsContentsPartService } from './edit-ms-contents-part.service';
import { EditMsContentsPartQuery } from './edit-ms-contents-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-ms-contents-part-feature',
  templateUrl: './ms-contents-part-feature.component.html',
  styleUrls: ['./ms-contents-part-feature.component.css'],
})
export class MsContentsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsContentsPartQuery,
    editPartService: EditMsContentsPartService,
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
    this.initEditor(['ms-content-states']);
  }
}
