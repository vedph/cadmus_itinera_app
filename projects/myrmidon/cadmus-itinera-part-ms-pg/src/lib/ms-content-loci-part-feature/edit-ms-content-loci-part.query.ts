import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsContentLociPartStore } from './edit-ms-content-loci-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsContentLociPartQuery extends EditPartQueryBase {
  constructor(store: EditMsContentLociPartStore) {
    super(store);
  }
}
