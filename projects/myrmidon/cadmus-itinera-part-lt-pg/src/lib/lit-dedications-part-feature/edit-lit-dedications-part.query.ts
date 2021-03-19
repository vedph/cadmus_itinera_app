import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditLitDedicationsPartStore } from './edit-lit-dedications-part.store';

@Injectable({ providedIn: 'root' })
export class EditLitDedicationsPartQuery extends EditPartQueryBase {
  constructor(store: EditLitDedicationsPartStore) {
    super(store);
  }
}
