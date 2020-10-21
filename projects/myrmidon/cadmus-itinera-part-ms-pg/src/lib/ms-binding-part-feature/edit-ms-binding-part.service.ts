import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsBindingPartStore } from './edit-ms-binding-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsBindingPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsBindingPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
