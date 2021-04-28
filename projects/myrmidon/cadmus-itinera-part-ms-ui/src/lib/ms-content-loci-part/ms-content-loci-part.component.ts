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
import { CadmusValidators, deepCopy } from '@myrmidon/cadmus-core';

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
  public loci: FormControl;

  public editedLocus: MsContentLocus | undefined;
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
    this.loci = formBuilder.control(
      [],
      CadmusValidators.strictMinLengthValidator(1)
    );
    this.form = formBuilder.group({
      loci: this.loci,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsContentLociPart): void {
    this.editedLocus = null;

    if (!model) {
      this.form.reset();
      return;
    }
    this.loci.setValue(model.loci || []);
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
    part.loci = this.loci.value;
    return part;
  }

  private closeLocusEditor(): void {
    this.editedLocus = undefined;
    this.editedIndex = -1;
    this.editorOpen = false;
  }

  public addLocus(): void {
    this.editedIndex = -1;
    this.editedLocus = {
      citation: null,
      text: null,
    };
  }

  public editLocus(index: number): void {
    this.editedLocus = this.loci.value[index];
    this.editedIndex = index;
    this.editorOpen = true;
  }

  public onLocusChange(locus: MsContentLocus): void {
    if (this.editedIndex === -1) {
      this.loci.value.push(locus);
    } else {
      this.loci.value.splice(this.editedIndex, 1, locus);
    }
    this.closeLocusEditor();
    this.loci.updateValueAndValidity();
    this.form.markAsDirty();
  }

  public onLocusClose(): void {
    this.closeLocusEditor();
  }

  public deleteLocus(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete locus?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.closeLocusEditor();
          this.loci.value.splice(index, 1);
          this.loci.updateValueAndValidity();
          this.form.markAsDirty();
        }
      });
  }

  public moveLocusUp(index: number): void {
    if (index < 1) {
      return;
    }
    this.closeLocusEditor();
    const locus = this.loci.value[index];
    const loci = [...this.loci.value];
    loci.splice(index, 1);
    loci.splice(index - 1, 0, locus);
    this.loci.setValue(loci);
    this.form.markAsDirty();
  }

  public moveLocusDown(index: number): void {
    if (index + 1 >= this.loci.value.length) {
      return;
    }
    this.closeLocusEditor();
    const locus = this.loci.value[index];
    const loci = [...this.loci.value];
    loci.splice(index, 1);
    loci.splice(index + 1, 0, locus);
    this.loci.setValue(loci);
    this.form.markAsDirty();
  }
}
