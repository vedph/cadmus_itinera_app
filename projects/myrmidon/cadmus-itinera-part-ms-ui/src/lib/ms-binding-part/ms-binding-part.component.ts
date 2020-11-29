import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsBindingPart, MSBINDING_PART_TYPEID } from '../ms-binding-part';
import { PhysicalSize } from '@myrmidon/cadmus-itinera-core';

/**
 * Manuscript's binding part.
 * Thesauri: ms-binding-materials (optional), ms-binding-support-materials
 * (optional), physical-size-tags (optional), physical-dimension-tags
 * (optional), physical-size-units.
 */
@Component({
  selector: 'cadmus-ms-binding-part',
  templateUrl: './ms-binding-part.component.html',
  styleUrls: ['./ms-binding-part.component.css'],
})
export class MsBindingPartComponent
  extends ModelEditorComponentBase<MsBindingPart>
  implements OnInit {
  public century: FormControl;
  public coverMaterial: FormControl;
  public supportMaterial: FormControl;
  public description: FormControl;

  public size: PhysicalSize;

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  public materialEntries: ThesaurusEntry[];
  public supportEntries: ThesaurusEntry[];
  public sizeTagEntries: ThesaurusEntry[];
  public dimTagEntries: ThesaurusEntry[];
  public unitEntries: ThesaurusEntry[];

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // form
    this.century = formBuilder.control(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(21),
    ]);
    this.coverMaterial = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.supportMaterial = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.description = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(5000),
    ]);
    this.form = formBuilder.group({
      century: this.century,
      coverMaterial: this.coverMaterial,
      supportMaterial: this.supportMaterial,
      description: this.description,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsBindingPart): void {
    if (!model) {
      this.form.reset();
      this.size = null;
      return;
    }
    this.century.setValue(model.century);
    this.coverMaterial.setValue(model.coverMaterial);
    this.supportMaterial.setValue(model.supportMaterial);
    this.description.setValue(model.description);
    this.size = model.size;
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsBindingPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'ms-binding-materials';
    if (this.thesauri && this.thesauri[key]) {
      this.materialEntries = this.thesauri[key].entries;
    } else {
      this.materialEntries = null;
    }

    key = 'ms-binding-support-materials';
    if (this.thesauri && this.thesauri[key]) {
      this.supportEntries = this.thesauri[key].entries;
    } else {
      this.supportEntries = null;
    }

    key = 'physical-size-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.sizeTagEntries = this.thesauri[key].entries;
    } else {
      this.sizeTagEntries = null;
    }

    key = 'physical-dimension-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.dimTagEntries = this.thesauri[key].entries;
    } else {
      this.dimTagEntries = null;
    }

    key = 'physical-size-units';
    if (this.thesauri && this.thesauri[key]) {
      this.unitEntries = this.thesauri[key].entries;
    } else {
      this.unitEntries = null;
    }
  }

  protected getModelFromForm(): MsBindingPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSBINDING_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        century: 0,
        description: null,
        coverMaterial: null,
        supportMaterial: null,
      };
    }
    part.century = this.century.value || 0;
    part.coverMaterial = this.coverMaterial.value?.trim();
    part.supportMaterial = this.supportMaterial.value?.trim();
    part.description = this.description.value?.trim();
    part.size = this.size;
    return part;
  }
}
