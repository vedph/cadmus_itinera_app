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
  public editedPseudonym: CorrPseudonym;

  public langEntries: ThesaurusEntry[];
  public tagEntries: ThesaurusEntry[];

  public pseudonyms: CorrPseudonym[];

  public count: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    this.pseudonyms = [];
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
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
    this.count.setValue(model.pseudonyms?.length || 0);
    this.pseudonyms = model.pseudonyms || [];
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
      this.langEntries = null;
    }

    key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
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
    part.pseudonyms = this.pseudonyms;
    return part;
  }

  public addPseudonym(): void {
    const pseudonym: CorrPseudonym = {
      language: null,
      value: null
    };
    this.pseudonyms = [...this.pseudonyms, pseudonym];
    this.count.setValue(this.pseudonyms.length);
    this.count.markAsDirty();
    this.editPseudonym(this.pseudonyms.length - 1);
  }

  public editPseudonym(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedPseudonym = null;
    } else {
      this._editedIndex = index;
      this.editedPseudonym = this.pseudonyms[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onPseudonymSaved(item: CorrPseudonym): void {
    this.pseudonyms = this.pseudonyms.map((s, i) =>
      i === this._editedIndex ? item : s
    );
    this.editPseudonym(-1);
    this.count.markAsDirty();
  }

  public onPseudonymClosed(): void {
    this.editPseudonym(-1);
  }

  public deletePseudonym(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete pseudonym?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const items = [...this.pseudonyms];
          items.splice(index, 1);
          this.pseudonyms = items;
          this.count.setValue(this.pseudonyms.length);
          this.count.markAsDirty();
        }
      });
  }

  public movePseudonymUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.pseudonyms[index];
    const items = [...this.pseudonyms];
    items.splice(index, 1);
    items.splice(index - 1, 0, item);
    this.pseudonyms = items;
  }

  public movePseudonymDown(index: number): void {
    if (index + 1 >= this.pseudonyms.length) {
      return;
    }
    const item = this.pseudonyms[index];
    const items = [...this.pseudonyms];
    items.splice(index, 1);
    items.splice(index + 1, 0, item);
    this.pseudonyms = items;
  }

  public getLanguage(id: string | null): string {
    if (!id) {
      return '';
    }
    if (this.langEntries?.length) {
      const entry = this.langEntries.find(e => {
        return e.id === id;
      });
      return entry?.value || id;
    } else {
      return id;
    }
  }
}
