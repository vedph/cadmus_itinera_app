import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditPersonEventsPartStore } from './edit-person-events-part.store';

@Injectable({ providedIn: 'root' })
export class EditPersonEventsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditPersonEventsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
