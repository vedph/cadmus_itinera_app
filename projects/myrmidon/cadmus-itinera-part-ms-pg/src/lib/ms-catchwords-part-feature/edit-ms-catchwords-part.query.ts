import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsCatchwordsPartStore } from './edit-ms-catchwords-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsCatchwordsPartQuery extends EditPartQueryBase {
  constructor(store: EditMsCatchwordsPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
