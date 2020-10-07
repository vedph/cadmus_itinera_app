import { Injectable } from '@angular/core';
import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';
import { EditPersonPartStore } from './edit-person-part.store';

@Injectable({ providedIn: 'root' })
export class EditPersonPartQuery extends EditPartQueryBase {
  constructor(store: EditPersonPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
