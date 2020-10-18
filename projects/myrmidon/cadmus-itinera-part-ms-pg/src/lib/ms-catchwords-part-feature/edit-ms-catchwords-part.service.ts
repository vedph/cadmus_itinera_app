import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsCatchwordsPartStore } from './edit-ms-catchwords-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsCatchwordsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsCatchwordsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
