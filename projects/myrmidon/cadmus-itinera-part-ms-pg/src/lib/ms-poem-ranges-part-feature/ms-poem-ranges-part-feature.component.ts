import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditMsPoemRangesPartQuery } from './edit-ms-poem-ranges-part.query';
import { EditMsPoemRangesPartService } from './edit-ms-poem-ranges-part.service';

@Component({
  selector: 'itinera-ms-poem-ranges-part-feature',
  templateUrl: './ms-poem-ranges-part-feature.component.html',
  styleUrls: ['./ms-poem-ranges-part-feature.component.css'],
})
export class MsPoemRangesPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsPoemRangesPartQuery,
    editPartService: EditMsPoemRangesPartService,
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
    this.initEditor(['ms-poem-ranges-tags']);
  }
}
