import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsNumberingsPartStore } from './edit-ms-numberings-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsNumberingsPartQuery extends EditPartQueryBase {
  constructor(store: EditMsNumberingsPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
