import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import {
  MsContentLociPart,
  MSCONTENT_LOCI_PART_TYPEID,
} from '../ms-content-loci-part';
import { MsContentLocus } from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';
import { deepCopy } from '@myrmidon/cadmus-core';

/**
 * MsContentLociPart editor component.
 * Thesauri: none.
 */
@Component({
  selector: 'itinera-ms-content-loci-part',
  templateUrl: './ms-content-loci-part.component.html',
  styleUrls: ['./ms-content-loci-part.component.css'],
})
export class MsContentLociPartComponent
  extends ModelEditorComponentBase<MsContentLociPart>
  implements OnInit {
  public count: FormControl;

  public loci: MsContentLocus[];
  public editedLocus: MsContentLocus;
  public editedIndex: number;
  public editorOpen: boolean;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.editorOpen = false;
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsContentLociPart): void {
    this.editedLocus = null;

    if (!model) {
      this.form.reset();
      this.loci = [];
      return;
    }
    this.count.setValue(model.loci?.length || 0);
    this.loci = model.loci || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsContentLociPart): void {
    this.updateForm(deepCopy(model));
  }

  protected getModelFromForm(): MsContentLociPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSCONTENT_LOCI_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        loci: [],
      };
    }
    part.loci = this.loci;
    return part;
  }

  public addLocus(): void {
    const locus: MsContentLocus = {
      citation: null,
      text: null,
    };
    this.loci = [...this.loci, locus];
    this.count.setValue(this.loci.length);
    this.count.markAsDirty();
    this.editLocus(this.loci.length - 1);
  }

  public editLocus(index: number): void {
    if (index < 0) {
      this.editedLocus = null;
      this.editedIndex = -1;
      this.editorOpen = false;
    } else {
      this.editedLocus = this.loci[index];
      this.editedIndex = index;
      this.editorOpen = true;
    }
  }

  public onLocusSaved(locus: MsContentLocus): void {
    this.loci = this.loci.map((l, i) =>
      i === this.editedIndex ? locus : l
    );
    this.count.markAsDirty();
    this.editLocus(-1);
  }

  public onLocusClosed(): void {
    this.editLocus(-1);
  }

  public deleteLocus(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete locus?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.editLocus(-1);
          const loci = [...this.loci];
          loci.splice(index, 1);
          this.loci = loci;
          this.count.setValue(this.loci.length);
          this.count.markAsDirty();
        }
      });
  }

  public moveLocusUp(index: number): void {
    if (index < 1) {
      return;
    }
    const locus = this.loci[index];
    const loci = [...this.loci];
    loci.splice(index, 1);
    loci.splice(index - 1, 0, locus);
    this.loci = loci;
    if (index === this.editedIndex) {
      this.editedIndex--;
    }
    this.form.markAsDirty();
  }

  public moveLocusDown(index: number): void {
    if (index + 1 >= this.loci.length) {
      return;
    }
    const locus = this.loci[index];
    const loci = [...this.loci];
    loci.splice(index, 1);
    loci.splice(index + 1, 0, locus);
    this.loci = loci;
    if (index === this.editedIndex) {
      this.editedIndex++;
    }
    this.form.markAsDirty();
  }
}
