import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditAttachmentsPartStore } from './edit-attachments-part.store';

@Injectable({ providedIn: 'root' })
export class EditAttachmentsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditAttachmentsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
