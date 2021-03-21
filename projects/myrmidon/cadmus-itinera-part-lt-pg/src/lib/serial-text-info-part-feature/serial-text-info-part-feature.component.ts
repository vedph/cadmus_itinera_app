import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditSerialTextInfoPartService } from './edit-serial-text-info-part.service';
import { EditSerialTextInfoPartQuery } from './edit-serial-text-info-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-serial-text-info-part-feature',
  templateUrl: './serial-text-info-part-feature.component.html',
  styleUrls: ['./serial-text-info-part-feature.component.css'],
})
export class SerialTextInfoPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditSerialTextInfoPartQuery,
    editPartService: EditSerialTextInfoPartService,
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
      'languages',
      'doc-reference-tags',
      'serial-text-genres',
      'serial-text-verses',
      'person-name-tags',
      'person-name-types',
      'person-id-tags',
    ]);
  }
}
