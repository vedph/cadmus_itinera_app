import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsWatermarksPartStore } from './edit-ms-watermarks-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsWatermarksPartQuery extends EditPartQueryBase {
  constructor(store: EditMsWatermarksPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
