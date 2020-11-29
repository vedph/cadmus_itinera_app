import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsHandsPartStore } from './edit-ms-hands-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsHandsPartQuery extends EditPartQueryBase {
  constructor(store: EditMsHandsPartStore) {
    super(store);
  }
}
