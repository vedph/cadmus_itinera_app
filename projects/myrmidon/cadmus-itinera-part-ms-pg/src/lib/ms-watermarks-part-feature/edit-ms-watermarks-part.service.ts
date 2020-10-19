import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsWatermarksPartStore } from './edit-ms-watermarks-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsWatermarksPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsWatermarksPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
