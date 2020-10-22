import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsContentsPartStore } from './edit-ms-contents-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsContentsPartQuery extends EditPartQueryBase {
  constructor(store: EditMsContentsPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
