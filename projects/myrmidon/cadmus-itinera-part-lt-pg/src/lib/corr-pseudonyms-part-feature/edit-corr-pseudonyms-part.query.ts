import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditCorrPseudonymsPartStore } from './edit-corr-pseudonyms-part.store';

@Injectable({ providedIn: 'root' })
export class EditCorrPseudonymsPartQuery extends EditPartQueryBase {
  constructor(store: EditCorrPseudonymsPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
