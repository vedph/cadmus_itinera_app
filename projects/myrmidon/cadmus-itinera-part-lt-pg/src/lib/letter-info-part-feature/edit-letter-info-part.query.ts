import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditLetterInfoPartStore } from './edit-letter-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditLetterInfoPartQuery extends EditPartQueryBase {
  constructor(store: EditLetterInfoPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
