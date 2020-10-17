import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsCompositionPartStore } from './edit-ms-composition-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsCompositionPartQuery extends EditPartQueryBase {
  constructor(store: EditMsCompositionPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
