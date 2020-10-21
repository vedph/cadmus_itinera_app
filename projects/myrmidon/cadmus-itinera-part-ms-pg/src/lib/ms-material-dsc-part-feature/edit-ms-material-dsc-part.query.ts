import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsMaterialDscPartStore } from './edit-ms-material-dsc-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsMaterialDscPartQuery extends EditPartQueryBase {
  constructor(store: EditMsMaterialDscPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
