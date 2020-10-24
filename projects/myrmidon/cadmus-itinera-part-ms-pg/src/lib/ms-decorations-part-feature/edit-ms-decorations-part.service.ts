import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsDecorationsPartStore } from './edit-ms-decorations-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsDecorationsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsDecorationsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
