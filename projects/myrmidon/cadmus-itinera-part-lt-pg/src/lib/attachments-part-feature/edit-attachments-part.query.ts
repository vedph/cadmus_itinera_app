import { Injectable } from '@angular/core';

import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';

import { EditAttachmentsPartStore } from './edit-attachments-part.store';

@Injectable({ providedIn: 'root' })
export class EditAttachmentsPartQuery extends EditPartQueryBase {
  constructor(store: EditAttachmentsPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
