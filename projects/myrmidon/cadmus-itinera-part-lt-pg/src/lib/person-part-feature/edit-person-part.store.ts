import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import {
  EditPartState,
  EditPartStoreApi,
  editPartInitialState,
} from '@myrmidon/cadmus-state';

import { PERSON_PART_TYPEID } from '@myrmidon/cadmus-itinera-part-lt-ui';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: PERSON_PART_TYPEID })
export class EditPersonPartStore
  extends Store<EditPartState>
  implements EditPartStoreApi {
  constructor() {
    super(editPartInitialState);
  }

  public setDirty(value: boolean): void {
    this.update({ dirty: value });
  }
  public setSaving(value: boolean): void {
    this.update({ saving: value });
  }
}
