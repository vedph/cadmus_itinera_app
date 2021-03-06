import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ThesauriSet } from '@myrmidon/cadmus-core';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase,
} from '@myrmidon/cadmus-state';

import { EditMsBindingPartService } from './edit-ms-binding-part.service';
import { EditMsBindingPartQuery } from './edit-ms-binding-part.query';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'itinera-ms-binding-part-feature',
  templateUrl: './ms-binding-part-feature.component.html',
  styleUrls: ['./ms-binding-part-feature.component.css'],
})
export class MsBindingPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditMsBindingPartQuery,
    editPartService: EditMsBindingPartService,
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
      'ms-binding-materials',
      'ms-binding-support-materials',
      'physical-size-tags',
      'physical-dimension-tags',
      'physical-size-units',
    ]);
  }
}
