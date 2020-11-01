import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditPoeticTextInfoPartStore } from './edit-poetic-text-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditPoeticTextInfoPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditPoeticTextInfoPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
