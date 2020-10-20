import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';
import { EditMsPoemRangesPartStore } from './edit-ms-poem-ranges-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsPoemRangesPartQuery extends EditPartQueryBase {
  constructor(store: EditMsPoemRangesPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
