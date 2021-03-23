import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';
import { EditMsDecorationsPartQuery } from './edit-ms-decorations-part.query';
import { EditMsDecorationsPartService } from './edit-ms-decorations-part.service';

@Component({
  selector: 'itinera-ms-decorations-part-feature',
  templateUrl: './ms-decorations-part-feature.component.html',
  styleUrls: ['./ms-decorations-part-feature.component.css'],
})
export class MsDecorationsPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsDecorationsPartQuery,
    editPartService: EditMsDecorationsPartService,
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
      'ms-decoration-elem-types',
      'ms-decoration-artist-types',
      'ms-decoration-elem-flags',
      'ms-decoration-elem-colors',
      'ms-decoration-elem-gildings',
      'ms-decoration-elem-techniques',
      'ms-decoration-elem-positions',
      'ms-decoration-elem-tools',
      'ms-decoration-elem-typologies',
      'ms-decoration-type-hidden',
    ]);
  }
}
