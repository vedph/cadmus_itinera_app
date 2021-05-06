import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { PERSON_WORKS_PART_TYPEID } from '@myrmidon/cadmus-itinera-part-lt-ui';

import {
  EditPartState,
  EditPartStoreApi,
  editPartInitialState,
} from '@myrmidon/cadmus-state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: PERSON_WORKS_PART_TYPEID })
export class EditPersonWorksPartStore
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
