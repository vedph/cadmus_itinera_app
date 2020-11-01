import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';

import { LetterInfoPart, LETTER_INFO_PART_TYPEID } from '../letter-info-part';

/**
 * Letter's information part editor component.
 * Thesauri: languages (optional).
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
  public heading: FormControl;
  public note: FormControl;

  public langEntries: ThesaurusEntry[];

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // form
    this.language = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.subject = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(500),
    ]);
    this.heading = formBuilder.control(null, Validators.maxLength(500));
    this.note = formBuilder.control(null, Validators.maxLength(1000));
    this.form = formBuilder.group({
      language: this.language,
      subject: this.subject,
      heading: this.heading,
      note: this.note,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: LetterInfoPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.language.setValue(model.language);
    this.subject.setValue(model.subject);
    this.heading.setValue(model.heading);
    this.note.setValue(model.note);
    this.form.markAsPristine();
  }

  protected onModelSet(model: LetterInfoPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    const key = 'languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = null;
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
        subject: null,
      };
    }
    part.language = this.language.value?.trim();
    part.subject = this.subject.value?.trim();
    part.heading = this.heading.value?.trim();
    part.note = this.note.value?.trim();
    return part;
  }
}
