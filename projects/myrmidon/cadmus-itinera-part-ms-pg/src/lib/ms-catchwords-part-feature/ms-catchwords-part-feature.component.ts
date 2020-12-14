import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditMsCatchwordsPartQuery } from './edit-ms-catchwords-part.query';
import { EditMsCatchwordsPartService } from './edit-ms-catchwords-part.service';

@Component({
  selector: 'itinera-ms-catchwords-part-feature',
  templateUrl: './ms-catchwords-part-feature.component.html',
  styleUrls: ['./ms-catchwords-part-feature.component.css'],
})
export class MsCatchwordsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsCatchwordsPartQuery,
    editPartService: EditMsCatchwordsPartService,
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
    this.initEditor(['ms-catchword-positions']);
  }
}
