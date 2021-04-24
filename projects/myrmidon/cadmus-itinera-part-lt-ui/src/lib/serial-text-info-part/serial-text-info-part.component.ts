import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, DocReference, ThesaurusEntry } from '@myrmidon/cadmus-core';

import {
  SerialTextInfoPart,
  SERIAL_TEXT_INFO_PART_TYPEID,
} from '../serial-text-info-part';
import { CitedPerson, DecoratedId } from '@myrmidon/cadmus-itinera-core';

/**
 * Serial text's information part editor component.
 * Thesauri: serial-text-languages, doc-reference-tags, serial-text-genres,
 * serial-text-verses, person-name-tags, person-name-types,
 * person-id-tags, person-name-languages (all optional).
 */
@Component({
  selector: 'itinera-serial-text-info-part',
  templateUrl: './serial-text-info-part.component.html',
  styleUrls: ['./serial-text-info-part.component.css'],
})
export class SerialTextInfoPartComponent
  extends ModelEditorComponentBase<SerialTextInfoPart>
  implements OnInit {
  public textId: FormControl;
  public language: FormControl;
  public subject: FormControl;
  public authors: FormControl;
  public genre: FormControl;
  public verse: FormControl;
  public rhyme: FormControl;
  public headings: FormControl;
  public received: FormControl;
  public note: FormControl;
  public related: FormControl;
  public recipients: FormControl;
  public replyingTo: FormControl;

  public initialRelated: DocReference[];
  public initialRecipients: DecoratedId[];
  public initialReplyingTo: DecoratedId[];

  // serial-text-languages
  public langEntries: ThesaurusEntry[] | undefined;
  // doc-reference-tags
  public tagEntries: ThesaurusEntry[] | undefined;
  // serial-text-genres
  public genreEntries: ThesaurusEntry[] | undefined;
  // serial-text-verses
  public verseEntries: ThesaurusEntry[] | undefined;
  // person-name-tags
  public nameTagEntries: ThesaurusEntry[] | undefined;
  // person-name-types
  public nameTypeEntries: ThesaurusEntry[] | undefined;
  // person-id-tags
  public idTagEntries: ThesaurusEntry[] | undefined;
  // person-name-languages
  public nameLangEntries: ThesaurusEntry[] | undefined;

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    this.initialRecipients = [];
    this.initialReplyingTo = [];
    this.initialRelated = [];
    // form
    this.textId = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.language = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.subject = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(500),
    ]);
    this.authors = formBuilder.control([]);
    this.genre = formBuilder.control(null, Validators.maxLength(50));
    this.verse = formBuilder.control(null, Validators.maxLength(50));
    this.rhyme = formBuilder.control(null, Validators.maxLength(100));
    this.headings = formBuilder.control(null, Validators.maxLength(5000));
    this.received = formBuilder.control(false);
    this.note = formBuilder.control(null, Validators.maxLength(1000));
    this.related = formBuilder.control([]);
    this.recipients = formBuilder.control([]);
    this.replyingTo = formBuilder.control([]);
    this.form = formBuilder.group({
      textId: this.textId,
      language: this.language,
      subject: this.subject,
      authors: this.authors,
      genre: this.genre,
      verse: this.verse,
      rhyme: this.rhyme,
      headings: this.headings,
      received: this.received,
      note: this.note,
      related: this.related,
      recipients: this.recipients,
      replyingTo: this.replyingTo,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: SerialTextInfoPart): void {
    if (!model) {
      this.initialRelated = [];
      this.initialRecipients = [];
      this.initialReplyingTo = [];
      this.form.reset();
      return;
    }
    this.initialRelated = model.related || [];
    this.initialRecipients = model.recipients || [];
    this.initialReplyingTo = model.replyingTo || [];

    this.textId.setValue(model.textId);
    this.language.setValue(model.language);
    this.subject.setValue(model.subject);
    this.authors.setValue(model.authors || []);
    this.genre.setValue(model.genre);
    this.verse.setValue(model.verse);
    this.rhyme.setValue(model.rhyme);
    this.headings.setValue(model.headings?.join('\n'));
    this.received.setValue(model.isReceived);
    this.note.setValue(model.note);
    this.form.markAsPristine();
  }

  protected onModelSet(model: SerialTextInfoPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'serial-text-languages';
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

    key = 'serial-text-genres';
    if (this.thesauri && this.thesauri[key]) {
      this.genreEntries = this.thesauri[key].entries;
    } else {
      this.genreEntries = undefined;
    }

    key = 'serial-text-verses';
    if (this.thesauri && this.thesauri[key]) {
      this.verseEntries = this.thesauri[key].entries;
    } else {
      this.verseEntries = undefined;
    }

    key = 'person-name-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.nameTagEntries = this.thesauri[key].entries;
    } else {
      this.nameTagEntries = undefined;
    }

    key = 'person-name-types';
    if (this.thesauri && this.thesauri[key]) {
      this.nameTypeEntries = this.thesauri[key].entries;
    } else {
      this.nameTypeEntries = undefined;
    }

    key = 'person-id-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.idTagEntries = this.thesauri[key].entries;
    } else {
      this.idTagEntries = undefined;
    }

    key = 'person-name-languages';
    if (this.thesauri && this.thesauri[key]) {
      this.nameLangEntries = this.thesauri[key].entries;
    } else {
      this.nameLangEntries = undefined;
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

  protected getModelFromForm(): SerialTextInfoPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: SERIAL_TEXT_INFO_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        letterId: null,
        language: null,
        authorId: null,
        subject: null,
      };
    }
    part.textId = this.textId.value?.trim();
    part.language = this.language.value?.trim();
    part.subject = this.subject.value?.trim();
    part.authors = this.authors.value?.length ? this.authors.value : undefined;
    part.genre = this.genre.value?.trim();
    part.verse = this.verse.value?.trim();
    part.rhyme = this.rhyme.value?.trim();
    part.headings = this.parseIds(this.headings.value?.trim());
    part.received = this.received.value ? true : undefined;
    part.note = this.note.value?.trim();

    part.related = this.related.value?.length ? this.related.value : undefined;
    part.recipients = this.recipients?.value?.length
      ? this.recipients.value
      : undefined;
    part.replyingTo = this.replyingTo?.value?.length
      ? this.replyingTo.value
      : undefined;

    return part;
  }

  public onPersonsChange(persons: CitedPerson[]): void {
    this.authors.setValue(persons);
    this.form.markAsDirty();
  }

  public onRecipientsChange(ids: DecoratedId[]): void {
    this.recipients.setValue(ids);
    this.form.markAsDirty();
  }

  public onReplyingToChange(ids: DecoratedId[]): void {
    this.replyingTo.setValue(ids);
    this.form.markAsDirty();
  }

  public onRelatedChange(related: DocReference[]): void {
    this.related.setValue(related);
    this.form.markAsDirty();
  }
}
