import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsDimensionsPartStore } from './edit-ms-dimensions-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsDimensionsPartQuery extends EditPartQueryBase {
  constructor(store: EditMsDimensionsPartStore) {
    super(store);
  }
}
