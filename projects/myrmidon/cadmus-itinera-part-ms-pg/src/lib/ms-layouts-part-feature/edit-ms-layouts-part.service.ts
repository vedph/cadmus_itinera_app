import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsLayoutsPartStore } from './edit-ms-layouts-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsLayoutsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsLayoutsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
