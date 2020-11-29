import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditCorrDedicationsPartStore } from './edit-corr-dedications-part.store';

@Injectable({ providedIn: 'root' })
export class EditCorrDedicationsPartQuery extends EditPartQueryBase {
  constructor(store: EditCorrDedicationsPartStore) {
    super(store);
  }
}
