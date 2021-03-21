import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditSerialTextInfoPartStore } from './edit-serial-text-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditSerialTextInfoPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditSerialTextInfoPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
