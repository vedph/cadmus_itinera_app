import { Injectable } from '@angular/core';
import { UtilService } from '@myrmidon/cadmus-core';
import { EditPartQueryBase } from '@myrmidon/cadmus-state';
import { EditMsSignaturesPartStore } from './edit-ms-signatures-part.store';

@Injectable({ providedIn: 'root' })
export class EditMsSignaturesPartQuery extends EditPartQueryBase {
  constructor(store: EditMsSignaturesPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
