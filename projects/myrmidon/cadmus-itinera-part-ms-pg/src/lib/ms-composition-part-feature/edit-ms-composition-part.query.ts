import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsCompositionPartStore } from './edit-ms-composition-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsCompositionPartQuery extends EditPartQueryBase {
  constructor(store: EditMsCompositionPartStore) {
    super(store);
  }
}
