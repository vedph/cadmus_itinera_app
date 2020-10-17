import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsPlacePartStore } from './edit-ms-place-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsPlacePartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsPlacePartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
