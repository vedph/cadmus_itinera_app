import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsContentLociPartStore } from './edit-ms-content-loci-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsContentLociPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsContentLociPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
