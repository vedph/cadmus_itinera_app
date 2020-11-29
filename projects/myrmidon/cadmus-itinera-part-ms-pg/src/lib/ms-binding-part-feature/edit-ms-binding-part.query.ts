import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsBindingPartStore } from './edit-ms-binding-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsBindingPartQuery extends EditPartQueryBase {
  constructor(store: EditMsBindingPartStore) {
    super(store);
  }
}
