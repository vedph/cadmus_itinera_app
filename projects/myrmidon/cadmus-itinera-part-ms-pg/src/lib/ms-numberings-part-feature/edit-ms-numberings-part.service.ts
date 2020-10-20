import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsNumberingsPartStore } from './edit-ms-numberings-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsNumberingsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsNumberingsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
