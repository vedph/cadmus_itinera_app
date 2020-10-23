import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsHandsPartStore } from './edit-ms-hands-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsHandsPartQuery extends EditPartQueryBase {
  constructor(store: EditMsHandsPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
