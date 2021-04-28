import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { CadmusValidators, deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsDecoration } from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';
import {
  MsDecorationsPart,
  MSDECORATIONS_PART_TYPEID,
} from '../ms-decorations-part';

/**
 * Manuscript's decorations part.
 * Thesauri: ms-decoration-elem-types (required), and optional:
 * ms-decoration-artist-types, ms-decoration-elem-flags,
 * ms-decoration-elem-colors, ms-decoration-elem-gildings,
 * ms-decoration-elem-techniques, ms-decoration-elem-positions,
 * ms-decoration-elem-tools, ms-decoration-elem-typologies,
 * ms-decoration-type-hidden, doc-reference-tags.
 */
@Component({
  selector: 'itinera-ms-decorations-part',
  templateUrl: './ms-decorations-part.component.html',
  styleUrls: ['./ms-decorations-part.component.css'],
})
export class MsDecorationsPartComponent
  extends ModelEditorComponentBase<MsDecorationsPart>
  implements OnInit {
  private _editedIndex: number;

  // ms-decoration-artist-types
  public decArtTypeEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-types (required)
  public decElemTypeEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-flags
  public decElemFlagEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-colors
  public decElemColorEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-gildings
  public decElemGildingEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-techniques
  public decElemTechEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-positions
  public decElemPosEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-tools
  public decElemToolEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-elem-typologies
  public decElemTypolEntries: ThesaurusEntry[] | undefined;
  // ms-decoration-type-hidden
  public decTypeHiddenEntries: ThesaurusEntry[] | undefined;
  // doc-reference-tags
  public docRefTagEntries: ThesaurusEntry[] | undefined;

  public tabIndex: number;
  public editedDecoration: MsDecoration;

  public decorations: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    // form
    this.decorations = formBuilder.control([],
      CadmusValidators.strictMinLengthValidator(1));
    this.form = formBuilder.group({
      decorations: this.decorations,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsDecorationsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.decorations.setValue(model.decorations || []);
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsDecorationsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'ms-decoration-artist-types';
    if (this.thesauri && this.thesauri[key]) {
      this.decArtTypeEntries = this.thesauri[key].entries;
    } else {
      this.decArtTypeEntries = undefined;
    }

    key = 'ms-decoration-elem-types';
    if (this.thesauri && this.thesauri[key]) {
      this.decElemTypeEntries = this.thesauri[key].entries;
    } else {
      this.decElemTypeEntries = undefined;
    }

    key = 'ms-decoration-elem-flags';
    if (this.thesauri && this.thesauri[key]) {
      this.decElemFlagEntries = this.thesauri[key].entries;
    } else {
      this.decElemFlagEntries = undefined;
    }

    key = 'ms-decoration-elem-colors';
    if (this.thesauri && this.thesauri[key]) {
      this.decElemColorEntries = this.thesauri[key].entries;
    } else {
      this.decElemColorEntries = undefined;
    }

    key = 'ms-decoration-elem-gildings';
    if (this.thesauri && this.thesauri[key]) {
      this.decElemGildingEntries = this.thesauri[key].entries;
    } else {
      this.decElemGildingEntries = undefined;
    }

    key = 'ms-decoration-elem-techniques';
    if (this.thesauri && this.thesauri[key]) {
      this.decElemTechEntries = this.thesauri[key].entries;
    } else {
      this.decElemTechEntries = undefined;
    }

    key = 'ms-decoration-elem-positions';
    if (this.thesauri && this.thesauri[key]) {
      this.decElemPosEntries = this.thesauri[key].entries;
    } else {
      this.decElemPosEntries = undefined;
    }

    key = 'ms-decoration-elem-tools';
    if (this.thesauri && this.thesauri[key]) {
      this.decElemToolEntries = this.thesauri[key].entries;
    } else {
      this.decElemToolEntries = undefined;
    }

    key = 'ms-decoration-elem-typologies';
    if (this.thesauri && this.thesauri[key]) {
      this.decElemTypolEntries = this.thesauri[key].entries;
    } else {
      this.decElemTypolEntries = undefined;
    }

    key = 'ms-decoration-type-hidden';
    if (this.thesauri && this.thesauri[key]) {
      this.decTypeHiddenEntries = this.thesauri[key].entries;
    } else {
      this.decTypeHiddenEntries = undefined;
    }

    key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.docRefTagEntries = this.thesauri[key].entries;
    } else {
      this.docRefTagEntries = undefined;
    }
  }

  protected getModelFromForm(): MsDecorationsPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSDECORATIONS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        decorations: [],
      };
    }
    part.decorations = this.decorations.value || [];
    return part;
  }

  private closeDecorationEditor(): void {
    this._editedIndex = -1;
    this.tabIndex = 0;
    this.editedDecoration = undefined;
  }

  public editDecoration(index: number): void {
    this._editedIndex = index;
    this.editedDecoration = this.decorations.value[index];
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public addDecoration(): void {
    this._editedIndex = -1;
    this.editedDecoration = {
      id: '',
      name: '',
    };
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public onDecorationChange(decoration: MsDecoration): void {
    if (this._editedIndex === -1) {
      this.decorations.value.push(decoration);
    } else {
      this.decorations.value.splice(this._editedIndex, 1, decoration);
    }
    this.closeDecorationEditor();
    this.decorations.updateValueAndValidity();
    this.form.markAsDirty();
  }

  public onDecorationClose(): void {
    this.closeDecorationEditor();
  }

  public deleteDecoration(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete decoration?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.closeDecorationEditor();
          this.decorations.value.splice(index, 1);
          this.decorations.updateValueAndValidity();
          this.form.markAsDirty();
        }
      });
  }

  public moveDecorationUp(index: number): void {
    if (index < 1) {
      return;
    }
    this.closeDecorationEditor();
    const decoration = this.decorations[index];
    this.decorations.value.splice(index, 1);
    this.decorations.value.splice(index - 1, 0, decoration);
    this.form.markAsDirty();
  }

  public moveDecorationDown(index: number): void {
    if (index + 1 >= this.decorations.value.length) {
      return;
    }
    this.closeDecorationEditor();
    const decoration = this.decorations[index];
    this.decorations.value.splice(index, 1);
    this.decorations.value.splice(index + 1, 0, decoration);
    this.form.markAsDirty();
  }

  public typeIdToString(id: string): string {
    if (!id) {
      return '';
    } else {
      return (
        this.decElemTypeEntries?.find((e) => {
          return e.id === id;
        })?.value || id
      );
    }
  }
}
