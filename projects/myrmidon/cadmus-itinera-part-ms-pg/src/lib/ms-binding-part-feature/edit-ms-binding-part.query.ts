import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditMsBindingPartStore } from './edit-ms-binding-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsBindingPartQuery extends EditPartQueryBase {
  constructor(store: EditMsBindingPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
