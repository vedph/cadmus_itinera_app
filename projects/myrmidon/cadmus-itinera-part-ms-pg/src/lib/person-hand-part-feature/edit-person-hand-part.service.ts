import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditPersonHandPartStore } from './edit-person-hand-part.store';

@Injectable({ providedIn: 'root' })
export class EditPersonHandPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditPersonHandPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
