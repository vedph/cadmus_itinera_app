import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';

import {
  CorrPseudonymsPart,
  CORR_PSEUDONYMS_PART_TYPEID,
} from '../corr-pseudonyms-part';
import { CorrPseudonym } from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * Correspondent's pseudonyms part editor.
 * Thesauri: languages, doc-reference-tags (all optional).
 */
@Component({
  selector: 'itinera-corr-pseudonyms-part',
  templateUrl: './corr-pseudonyms-part.component.html',
  styleUrls: ['./corr-pseudonyms-part.component.css'],
})
export class CorrPseudonymsPartComponent
  extends ModelEditorComponentBase<CorrPseudonymsPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedPseudonym: CorrPseudonym | undefined;

  public langEntries: ThesaurusEntry[] | undefined;
  public tagEntries: ThesaurusEntry[] | undefined;

  public pseudonyms: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    // form
    this.pseudonyms = formBuilder.control([], Validators.required);
    this.form = formBuilder.group({
      pseudonyms: this.pseudonyms,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: CorrPseudonymsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.pseudonyms.setValue(model.pseudonyms || []);
    this.form.markAsPristine();
  }

  protected onModelSet(model: CorrPseudonymsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = undefined;
    }

    key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = undefined;
    }
  }

  protected getModelFromForm(): CorrPseudonymsPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: CORR_PSEUDONYMS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        pseudonyms: [],
      };
    }
    part.pseudonyms = this.pseudonyms.value;
    return part;
  }

  private closePseudonymEditor(): void {
    this._editedIndex = -1;
    this.tabIndex = 0;
    this.editedPseudonym = undefined;
  }

  public addPseudonym(): void {
    this._editedIndex = -1;
    this.editedPseudonym = {
      language: null,
      value: null,
    };
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public editPseudonym(index: number): void {
    this._editedIndex = index;
    this.editedPseudonym = this.pseudonyms.value[index];
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public onPseudonymChange(pseudonym: CorrPseudonym): void {
    if (this._editedIndex === -1) {
      this.pseudonyms.value.push(pseudonym);
    } else {
      this.pseudonyms.value.splice(this._editedIndex, 1, pseudonym);
    }
    this.closePseudonymEditor();
    this.form.markAsDirty();
  }

  public onPseudonymClose(): void {
    this.closePseudonymEditor();
  }

  public deletePseudonym(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete pseudonym?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.closePseudonymEditor();
          this.pseudonyms.value.splice(index, 1);
          this.form.markAsDirty();
        }
      });
  }

  public movePseudonymUp(index: number): void {
    if (index < 1) {
      return;
    }
    this.closePseudonymEditor();
    const pseudonym = this.pseudonyms.value[index];
    const pseudonyms = [...this.pseudonyms.value];
    pseudonyms.splice(index, 1);
    pseudonyms.splice(index - 1, 0, pseudonym);
    this.pseudonyms.setValue(pseudonyms);
  }

  public movePseudonymDown(index: number): void {
    if (index + 1 >= this.pseudonyms.value.length) {
      return;
    }
    this.closePseudonymEditor();
    const pseudonym = this.pseudonyms.value[index];
    const pseudonyms = [...this.pseudonyms.value];
    pseudonyms.splice(index, 1);
    pseudonyms.splice(index + 1, 0, pseudonym);
    this.pseudonyms.setValue(pseudonyms);
  }

  public getLanguage(id: string | null): string {
    if (!id) {
      return '';
    }
    if (this.langEntries?.length) {
      const entry = this.langEntries.find((e) => {
        return e.id === id;
      });
      return entry?.value || id;
    } else {
      return id;
    }
  }
}
