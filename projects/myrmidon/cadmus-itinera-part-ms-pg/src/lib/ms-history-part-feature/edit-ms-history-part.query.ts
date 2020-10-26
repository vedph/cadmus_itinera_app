import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsHistoryPartStore } from './edit-ms-history-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsHistoryPartQuery extends EditPartQueryBase {
  constructor(store: EditMsHistoryPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
