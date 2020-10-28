import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditCorrDedicationsPartStore } from './edit-corr-dedications-part.store';

@Injectable({ providedIn: 'root' })
export class EditCorrDedicationsPartQuery extends EditPartQueryBase {
  constructor(store: EditCorrDedicationsPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
