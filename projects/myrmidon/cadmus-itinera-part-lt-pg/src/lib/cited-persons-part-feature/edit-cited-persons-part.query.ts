import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditCitedPersonsPartStore } from './edit-cited-persons-part.store';

@Injectable({ providedIn: 'root' })
export class EditCitedPersonsPartQuery extends EditPartQueryBase {
  constructor(store: EditCitedPersonsPartStore) {
    super(store);
  }
}
