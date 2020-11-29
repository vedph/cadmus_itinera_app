import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsWatermarksPartStore } from './edit-ms-watermarks-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsWatermarksPartQuery extends EditPartQueryBase {
  constructor(store: EditMsWatermarksPartStore) {
    super(store);
  }
}
