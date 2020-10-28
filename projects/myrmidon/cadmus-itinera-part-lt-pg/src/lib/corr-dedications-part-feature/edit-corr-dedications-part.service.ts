import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditCorrDedicationsPartStore } from './edit-corr-dedications-part.store';

@Injectable({ providedIn: 'root' })
export class EditCorrDedicationsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditCorrDedicationsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
