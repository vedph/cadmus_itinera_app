import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsQuiresPartStore } from './edit-ms-quires-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsQuiresPartQuery extends EditPartQueryBase {
  constructor(store: EditMsQuiresPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
