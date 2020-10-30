import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditCitedPersonsPartStore } from './edit-cited-persons-part.store';

@Injectable({ providedIn: 'root' })
export class EditCitedPersonsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditCitedPersonsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
