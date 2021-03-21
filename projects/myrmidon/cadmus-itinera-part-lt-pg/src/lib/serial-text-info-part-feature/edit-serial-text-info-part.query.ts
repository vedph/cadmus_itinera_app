import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditSerialTextInfoPartStore } from './edit-serial-text-info-part.store';

@Injectable({ providedIn: 'root' })
export class EditSerialTextInfoPartQuery extends EditPartQueryBase {
  constructor(store: EditSerialTextInfoPartStore) {
    super(store);
  }
}
