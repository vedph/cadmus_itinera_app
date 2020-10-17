import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsPlacePartStore } from './edit-ms-place-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsPlacePartQuery extends EditPartQueryBase {
  constructor(store: EditMsPlacePartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
