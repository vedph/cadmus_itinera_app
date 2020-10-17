import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsCompositionPartStore } from './edit-ms-composition-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsCompositionPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsCompositionPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
