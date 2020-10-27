import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditPersonEventsPartStore } from './edit-person-events-part.store';

@Injectable({ providedIn: 'root' })
export class EditPersonEventsPartQuery extends EditPartQueryBase {
  constructor(store: EditPersonEventsPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
