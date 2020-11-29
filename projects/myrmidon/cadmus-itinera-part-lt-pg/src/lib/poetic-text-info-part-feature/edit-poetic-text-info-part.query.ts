import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditPoeticTextInfoPartStore } from './edit-poetic-text-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditPoeticTextInfoPartQuery extends EditPartQueryBase {
  constructor(store: EditPoeticTextInfoPartStore) {
    super(store);
  }
}
