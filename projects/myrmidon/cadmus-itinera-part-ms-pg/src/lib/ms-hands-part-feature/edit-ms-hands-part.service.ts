import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsHandsPartStore } from './edit-ms-hands-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsHandsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsHandsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
