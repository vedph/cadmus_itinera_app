import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditLitDedicationsPartStore } from './edit-lit-dedications-part.store';

@Injectable({ providedIn: 'root' })
export class EditLitDedicationsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditLitDedicationsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
