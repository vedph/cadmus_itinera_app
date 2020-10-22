import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsDimensionsPartStore } from './edit-ms-dimensions-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsDimensionsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsDimensionsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
