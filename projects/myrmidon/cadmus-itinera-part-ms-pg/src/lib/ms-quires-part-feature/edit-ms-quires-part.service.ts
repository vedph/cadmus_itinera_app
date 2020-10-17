import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsQuiresPartStore } from './edit-ms-quires-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsQuiresPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsQuiresPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
