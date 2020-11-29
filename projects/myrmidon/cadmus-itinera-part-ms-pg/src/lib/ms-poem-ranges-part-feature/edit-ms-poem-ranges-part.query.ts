import { Injectable } from '@angular/core';

import { EditPartQueryBase } from '@myrmidon/cadmus-state';
import { EditMsPoemRangesPartStore } from './edit-ms-poem-ranges-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsPoemRangesPartQuery extends EditPartQueryBase {
  constructor(store: EditMsPoemRangesPartStore) {
    super(store);
  }
}
