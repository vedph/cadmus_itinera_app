import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditCitedPersonsPartStore } from './edit-cited-persons-part.store';

@Injectable({ providedIn: 'root' })
export class EditCitedPersonsPartQuery extends EditPartQueryBase {
  constructor(store: EditCitedPersonsPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
