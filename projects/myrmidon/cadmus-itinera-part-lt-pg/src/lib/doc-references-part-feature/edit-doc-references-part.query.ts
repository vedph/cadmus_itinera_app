import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditDocReferencesPartStore } from './edit-doc-references-part.store';

@Injectable({ providedIn: 'root' })
export class EditDocReferencesPartQuery extends EditPartQueryBase {
  constructor(store: EditDocReferencesPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
