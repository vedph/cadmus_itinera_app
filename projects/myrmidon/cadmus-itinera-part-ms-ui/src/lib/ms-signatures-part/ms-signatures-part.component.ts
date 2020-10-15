import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import {
  MsSignaturesPart,
  MSSIGNATURES_PART_TYPEID,
} from '../ms-signatures-part';
import { MsSignature } from '@myrmidon/cadmus-itinera-core';

/**
 * Manuscript's signatures part.
 * Thesauri (all optional): ms-signature-tags.
 */
@Component({
  selector: 'lib-ms-signatures-part',
  templateUrl: './ms-signatures-part.component.html',
  styleUrls: ['./ms-signatures-part.component.css'],
})
export class MsSignaturesPartComponent
  extends ModelEditorComponentBase<MsSignaturesPart>
  implements OnInit {
  public tagEntries: ThesaurusEntry[];

  public form: FormGroup;
  public signatures: FormArray;

  constructor(authService: AuthService, private _formBuilder: FormBuilder) {
    super(authService);
    // form
    this.signatures = _formBuilder.array([], Validators.min(1));
    this.form = _formBuilder.group({
      signatures: this.signatures
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsSignaturesPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    // TODO
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsSignaturesPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    // ms-signature-tags
    const key = 'ms-signature-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): MsSignaturesPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSSIGNATURES_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        signatures: [],
      };
    }
    // TODO part.signatures = [];
    return part;
  }

  private getSignatureGroup(item?: MsSignature): FormGroup {
    return this._formBuilder.group({
      tag: this._formBuilder.control(item?.tag),
      city: this._formBuilder.control(item?.city),
      library: this._formBuilder.control(item?.library),
      fund: this._formBuilder.control(item?.fund),
      location: this._formBuilder.control(item?.location)
    });
  }

  public addSignature(item?: MsSignature): void {
    this.signatures.push(this.getSignatureGroup(item));
  }

  public removeSignature(index: number): void {
    this.signatures.removeAt(index);
  }

  public moveSignatureUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.signatures.controls[index];
    this.signatures.removeAt(index);
    this.signatures.insert(index - 1, item);
  }

  public moveSignatureDown(index: number): void {
    if (index + 1 >= this.signatures.length) {
      return;
    }
    const item = this.signatures.controls[index];
    this.signatures.removeAt(index);
    this.signatures.insert(index + 1, item);
  }
}