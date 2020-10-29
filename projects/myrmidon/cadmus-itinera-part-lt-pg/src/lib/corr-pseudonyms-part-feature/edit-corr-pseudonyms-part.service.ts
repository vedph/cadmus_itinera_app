import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditCorrPseudonymsPartStore } from './edit-corr-pseudonyms-part.store';

@Injectable({ providedIn: 'root' })
export class EditCorrPseudonymsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditCorrPseudonymsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
