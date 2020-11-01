import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditPersonHandPartStore } from './edit-person-hand-part.store';

@Injectable({ providedIn: 'root' })
export class EditPersonHandPartQuery extends EditPartQueryBase {
  constructor(store: EditPersonHandPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
