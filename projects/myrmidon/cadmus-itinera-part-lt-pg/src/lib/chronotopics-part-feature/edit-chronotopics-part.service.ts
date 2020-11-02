import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditChronotopicsPartStore } from './edit-chronotopics-part.store';

@Injectable({ providedIn: 'root' })
export class EditChronotopicsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditChronotopicsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
