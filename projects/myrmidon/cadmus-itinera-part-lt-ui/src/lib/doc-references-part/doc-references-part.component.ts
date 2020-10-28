import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { DocReferencesPart, DOC_REFERENCES_PART_TYPEID } from '../doc-references-part';
import { BehaviorSubject } from 'rxjs';
import { DocReference } from '@myrmidon/cadmus-itinera-core';

/**
 * Document references part editor.
 * Thesauri: doc-reference-tags (optional).
 */
@Component({
  selector: 'cadmus-doc-references-part',
  templateUrl: './doc-references-part.component.html',
  styleUrls: ['./doc-references-part.component.css'],
})
export class DocReferencesPartComponent
  extends ModelEditorComponentBase<DocReferencesPart>
  implements OnInit {
  private _references: DocReference[];
  public count: FormControl;

  public tagEntries: ThesaurusEntry[];

  public references$: BehaviorSubject<DocReference[]>;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    this._references = [];
    this.references$ = new BehaviorSubject<DocReference[]>([]);
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: DocReferencesPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.references$.next(model.references || []);
    this.count.setValue(model.references?.length || 0);
    this.form.markAsPristine();
  }

  protected onModelSet(model: DocReferencesPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    const key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
    this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): DocReferencesPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: DOC_REFERENCES_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        references: []
      };
    }
    part.references = this._references;
    return part;
  }

  public onReferencesChanged(references: DocReference[]): void {
    this._references = references;
    this.count.setValue(references?.length || 0);
    this.count.markAsDirty();
  }
}
