import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsPoemRangesPartStore } from './edit-ms-poem-ranges-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsPoemRangesPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsPoemRangesPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
