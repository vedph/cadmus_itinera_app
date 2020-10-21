import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';

import {
  EditPartState,
  EditPartStoreApi,
  editPartInitialState,
} from '@myrmidon/cadmus-state';

import { MSBINDING_PART_TYPEID } from '@myrmidon/cadmus-itinera-part-ms-ui';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: MSBINDING_PART_TYPEID })
export class EditMsBindingPartStore
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
