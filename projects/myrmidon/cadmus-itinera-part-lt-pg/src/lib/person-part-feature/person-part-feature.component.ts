import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';
import { EditPersonPartQuery } from './edit-person-part.query';
import { EditPersonPartService } from './edit-person-part.service';
// TODO use snackbar from Cadmus/material
// import { MatSnackBar } from '@myrmidon/cadmus-material';

@Component({
  selector: 'itinera-person-part-feature',
  templateUrl: './person-part-feature.component.html',
  styleUrls: ['./person-part-feature.component.css'],
})
export class PersonPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditPersonPartQuery,
    editPartService: EditPersonPartService,
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

  ngOnInit(): void {
    this.initEditor([
      'person-name-languages',
      'person-name-types',
      'person-name-tags',
      'chronotope-tags',
      'doc-reference-tags'
    ]);
  }
}
