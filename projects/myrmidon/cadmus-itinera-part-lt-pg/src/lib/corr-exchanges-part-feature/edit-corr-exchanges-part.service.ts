import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditCorrExchangesPartStore } from './edit-corr-exchanges-part.store';

@Injectable({ providedIn: 'root' })
export class EditCorrExchangesPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditCorrExchangesPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
