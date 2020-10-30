import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';

import { CitedPerson, DocReference } from '@myrmidon/cadmus-itinera-core';
import {
  PoeticTextInfoPart,
  POETIC_TEXT_INFO_PART_TYPEID,
} from '../poetic-text-info-part';
import { BehaviorSubject } from 'rxjs';

/**
 * Poetic text information part.
 * Thesauri: languages, text-metres, doc-reference-tags (all optional).
 */
@Component({
  selector: 'cadmus-poetic-text-info-part',
  templateUrl: './poetic-text-info-part.component.html',
  styleUrls: ['./poetic-text-info-part.component.css'],
})
export class PoeticTextInfoPartComponent
  extends ModelEditorComponentBase<PoeticTextInfoPart>
  implements OnInit {
  public language: FormControl;
  public metre: FormControl;
  public subject: FormControl;

  public related: DocReference[];
  public related$: BehaviorSubject<DocReference[]>;
  public authors: CitedPerson[];

  public langEntries: ThesaurusEntry[];
  public metreEntries: ThesaurusEntry[];
  public tagEntries: ThesaurusEntry[];

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    this.related = [];
    this.authors = [];
    this.related$ = new BehaviorSubject<DocReference[]>([]);
    // form
    this.language = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.metre = formBuilder.control(null, Validators.maxLength(50));
    this.subject = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(500)
    ]);
    this.form = formBuilder.group({
      language: this.language,
      metre: this.metre,
      subject: this.subject,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: PoeticTextInfoPart): void {
    if (!model) {
      this.authors = [];
      this.related$.next([]);
      this.form.reset();
      return;
    }
    this.authors = model.authors || [];
    this.related$.next(model.related || []);
    this.language.setValue(model.language);
    this.metre.setValue(model.metre);
    this.subject.setValue(model.subject);
    this.form.markAsPristine();
  }

  protected onModelSet(model: PoeticTextInfoPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    let key = 'languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = null;
    }

    key = 'text-metres';
    if (this.thesauri && this.thesauri[key]) {
      this.metreEntries = this.thesauri[key].entries;
    } else {
      this.metreEntries = null;
    }

    key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): PoeticTextInfoPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: POETIC_TEXT_INFO_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        language: null,
        subject: null,
      };
    }
    part.authors = this.authors?.length ? this.authors : undefined;
    part.related = this.related?.length ? this.related : undefined;
    part.language = this.language.value?.trim();
    part.metre = this.metre.value?.trim();
    part.subject = this.subject.value?.trim();
    return part;
  }
}
