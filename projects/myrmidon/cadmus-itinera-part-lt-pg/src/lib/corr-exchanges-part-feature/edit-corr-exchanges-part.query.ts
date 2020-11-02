import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditCorrExchangesPartStore } from './edit-corr-exchanges-part.store';

@Injectable({ providedIn: 'root' })
export class EditCorrExchangesPartQuery extends EditPartQueryBase {
  constructor(store: EditCorrExchangesPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
