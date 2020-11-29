import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditPersonHandPartStore } from './edit-person-hand-part.store';

@Injectable({ providedIn: 'root' })
export class EditPersonHandPartQuery extends EditPartQueryBase {
  constructor(store: EditPersonHandPartStore) {
    super(store);
  }
}
