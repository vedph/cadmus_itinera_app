import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsDecorationsPartStore } from './edit-ms-decorations-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsDecorationsPartQuery extends EditPartQueryBase {
  constructor(store: EditMsDecorationsPartStore) {
    super(store);
  }
}
