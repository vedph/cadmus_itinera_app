import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';
import { EditPersonPartStore } from './edit-person-part.store';
import { EditPartServiceBase } from '@myrmidon/cadmus-state';

@Injectable({ providedIn: 'root' })
export class EditPersonPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditPersonPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
