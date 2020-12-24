import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsLayoutsPartStore } from './edit-ms-layouts-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsLayoutsPartQuery extends EditPartQueryBase {
  constructor(store: EditMsLayoutsPartStore) {
    super(store);
  }
}
