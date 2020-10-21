import { Injectable } from '@angular/core';

import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

import { EditMsMaterialDscPartStore } from './edit-ms-material-dsc-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsMaterialDscPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditMsMaterialDscPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
