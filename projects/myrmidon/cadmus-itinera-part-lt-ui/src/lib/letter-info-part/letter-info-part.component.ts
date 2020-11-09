import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';

import { LetterInfoPart, LETTER_INFO_PART_TYPEID } from '../letter-info-part';
import { DecoratedId } from '@myrmidon/cadmus-itinera-core';

/**
 * Letter's information part editor component.
 * Thesauri: languages (optional), doc-reference-tags.
 */
@Component({
  selector: 'cadmus-letter-info-part',
  templateUrl: './letter-info-part.component.html',
  styleUrls: ['./letter-info-part.component.css'],
})
export class LetterInfoPartComponent
  extends ModelEditorComponentBase<LetterInfoPart>
  implements OnInit {
  public language: FormControl;
  public subject: FormControl;
  public authorId: FormControl;
  public headings: FormControl;
  public note: FormControl;
  public recipients: DecoratedId[];
  public replyingTo: DecoratedId[];

  public langEntries: ThesaurusEntry[];
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
    this.recipients = [];
    this.replyingTo = [];
    // form
    this.language = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.authorId = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.subject = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(500),
    ]);
    this.headings = formBuilder.control(null, Validators.maxLength(5000));
    this.note = formBuilder.control(null, Validators.maxLength(1000));
    this.form = formBuilder.group({
      language: this.language,
      subject: this.subject,
      authorId: this.authorId,
      headings: this.headings,
      note: this.note,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: LetterInfoPart): void {
    if (!model) {
      this.recipients = [];
      this.replyingTo = [];
      this.form.reset();
      return;
    }
    this.recipients = model.recipients || [];
    this.replyingTo = model.replyingTo || [];
    this.language.setValue(model.language);
    this.subject.setValue(model.subject);
    this.authorId.setValue(model.authorId);
    this.headings.setValue(model.headings?.join('\n'));
    this.note.setValue(model.note);
    this.form.markAsPristine();
  }

  protected onModelSet(model: LetterInfoPart): void {
    this.updateForm(model);
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

  private parseIds(text: string): string[] {
    if (!text) {
      return undefined;
    } else {
      const set: Set<string> = new Set<string>();
      text.split('\n').map((s) => {
        s = s.trim();
        if (s) {
          set.add(s);
        }
      });
      const ids: string[] = [];
      for (const id of set.values()) {
        ids.push(id);
      }
      return ids;
    }
  }

  protected getModelFromForm(): LetterInfoPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: LETTER_INFO_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        language: null,
        authorId: null,
        subject: null,
      };
    }
    part.language = this.language.value?.trim();
    part.authorId = this.authorId.value?.trim();
    part.subject = this.subject.value?.trim();
    part.headings = this.parseIds(this.headings.value?.trim());
    part.recipients = this.recipients?.length ? this.recipients : undefined;
    part.replyingTo = this.replyingTo?.length ? this.replyingTo : undefined;
    part.note = this.note.value?.trim();
    return part;
  }

  public onRecipientsChange(ids: DecoratedId[]): void {
    this.recipients = ids;
    this.form.markAsDirty();
  }

  public onReplyingToChange(ids: DecoratedId[]): void {
    this.replyingTo = ids;
    this.form.markAsDirty();
  }
}
