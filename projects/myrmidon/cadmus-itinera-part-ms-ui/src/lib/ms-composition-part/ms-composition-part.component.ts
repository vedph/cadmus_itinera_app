import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';

import {
  MsCompositionPart,
  MSCOMPOSITION_PART_TYPEID,
} from '../ms-composition-part';
import { MsGuardSheet, MsSection } from '@myrmidon/cadmus-itinera-core';

/**
 * Manuscript's composition.
 * Thesauri: ms-material (optional).
 */
@Component({
  selector: 'cadmus-ms-composition-part',
  templateUrl: './ms-composition-part.component.html',
  styleUrls: ['./ms-composition-part.component.css'],
})
export class MsCompositionPartComponent
  extends ModelEditorComponentBase<MsCompositionPart>
  implements OnInit {

  public sheetCount: FormControl;
  public guardSheetCount: FormControl;

  public guardSheets: MsGuardSheet[];
  public editedGuardSheet: MsGuardSheet;

  public sections: MsSection[];
  public editedSection: MsSection;

  public tagEntries: ThesaurusEntry[];

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // form
    this.sheetCount = formBuilder.control(0, Validators.required);
    this.guardSheetCount = formBuilder.control(0);
    this.form = formBuilder.group({
      sheetCount: this.sheetCount,
      guardSheetCount: this.guardSheetCount
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsCompositionPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    // TODO setValue
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsCompositionPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    const key = 'ms-material';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): MsCompositionPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSCOMPOSITION_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        sheetCount: 0
      };
    }
    // TODO set part.x from controls
    return part;
  }
}
