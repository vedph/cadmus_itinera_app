import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditChronotopicsPartStore } from './edit-chronotopics-part.store';

@Injectable({ providedIn: 'root' })
export class EditChronotopicsPartQuery extends EditPartQueryBase {
  constructor(store: EditChronotopicsPartStore) {
    super(store);
  }
}
