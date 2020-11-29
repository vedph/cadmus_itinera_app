import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';

import { PersonHandPart, PERSON_HAND_PART_TYPEID } from '../person-hand-part';
import { MsHandSign } from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * PersonHand editor component.
 * Thesauri: ms-hand-types, ms-hand-jobs, ms-hand-sign-types (all optional).
 */
@Component({
  selector: 'cadmus-person-hand-part',
  templateUrl: './person-hand-part.component.html',
  styleUrls: ['./person-hand-part.component.css'],
})
export class PersonHandPartComponent
  extends ModelEditorComponentBase<PersonHandPart>
  implements OnInit {
  public personId: FormControl;
  public type: FormControl;
  public job: FormControl;
  public description: FormControl;
  public initials: FormControl;
  public corrections: FormControl;
  public punctuation: FormControl;
  public abbreviations: FormControl;
  public imageIds: FormControl;

  public signs: MsHandSign[];
  public editedIndex: number;
  public editorOpen: boolean;
  public editedSign: MsHandSign;

  public handTypeEntries: ThesaurusEntry[];
  public handJobEntries: ThesaurusEntry[];
  public signTypeEntries: ThesaurusEntry[];

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.editorOpen = false;
    this.editedIndex = -1;
    this.signs = [];
    // form
    this.personId = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.type = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.job = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.description = formBuilder.control(null, Validators.maxLength(2000));
    this.initials = formBuilder.control(null, Validators.maxLength(1000));
    this.corrections = formBuilder.control(null, Validators.maxLength(1000));
    this.punctuation = formBuilder.control(null, Validators.maxLength(1000));
    this.abbreviations = formBuilder.control(null, Validators.maxLength(1000));
    this.imageIds = formBuilder.control(null, Validators.maxLength(1000));
    this.form = formBuilder.group({
      personId: this.personId,
      type: this.type,
      job: this.job,
      description: this.description,
      initials: this.initials,
      corrections: this.corrections,
      punctuation: this.punctuation,
      abbreviations: this.abbreviations,
      imageIds: this.imageIds,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private imageIdsToString(ids: string[]): string {
    return ids ? ids.join(' ') : '';
  }

  private parseImageIds(text: string): string[] {
    if (!text) {
      return undefined;
    } else {
      const set: Set<string> = new Set<string>();
      text.split(' ').map((s) => {
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

  private updateForm(model: PersonHandPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.personId.setValue(model.personId);
    this.type.setValue(model.type);
    this.job.setValue(model.job);
    this.description.setValue(model.description);
    this.initials.setValue(model.initials);
    this.corrections.setValue(model.corrections);
    this.punctuation.setValue(model.punctuation);
    this.abbreviations.setValue(model.abbreviations);
    this.imageIds.setValue(this.imageIdsToString(model.imageIds));
    this.signs = model.signs || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: PersonHandPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'ms-hand-types';
    if (this.thesauri && this.thesauri[key]) {
      this.handTypeEntries = this.thesauri[key].entries;
    } else {
      this.handTypeEntries = null;
    }

    key = 'ms-hand-jobs';
    if (this.thesauri && this.thesauri[key]) {
      this.handJobEntries = this.thesauri[key].entries;
    } else {
      this.handJobEntries = null;
    }

    key = 'ms-hand-sign-types';
    if (this.thesauri && this.thesauri[key]) {
      this.signTypeEntries = this.thesauri[key].entries;
    } else {
      this.signTypeEntries = null;
    }
  }

  protected getModelFromForm(): PersonHandPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        personId: null,
        itemId: this.itemId,
        id: null,
        typeId: PERSON_HAND_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        type: null,
        job: null,
      };
    }
    part.personId = this.personId.value?.trim();
    part.type = this.type.value?.trim();
    part.job = this.job.value?.trim();
    part.description = this.description.value?.trim();
    part.initials = this.initials.value?.trim();
    part.corrections = this.corrections.value?.trim();
    part.punctuation = this.punctuation.value?.trim();
    part.abbreviations = this.abbreviations.value?.trim();
    part.imageIds = this.parseImageIds(this.imageIds.value);
    part.signs = this.signs?.length ? this.signs : undefined;
    return part;
  }

  public addSign(): void {
    const sign: MsHandSign = {
      id: null,
      type: null,
    };
    this.signs = [...this.signs, sign];
    this.editSign(this.signs.length - 1);
    this.form.markAsDirty();
  }

  public editSign(index: number): void {
    if (index < 0) {
      this.editedSign = null;
      this.editedIndex = -1;
      this.editorOpen = false;
    } else {
      this.editedSign = this.signs[index];
      this.editedIndex = index;
      this.editorOpen = true;
    }
  }

  public onSignSaved(item: MsHandSign): void {
    this.signs = this.signs.map((s, i) => (i === this.editedIndex ? item : s));
    this.editSign(-1);
    this.form.markAsDirty();
  }

  public onSignClosed(): void {
    this.editSign(-1);
  }

  public deleteSign(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete sign?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const signs = [...this.signs];
          signs.splice(index, 1);
          this.signs = signs;
          this.form.markAsDirty();
        }
      });
  }

  public moveSignUp(index: number): void {
    if (index < 1) {
      return;
    }
    const sign = this.signs[index];
    const signs = [...this.signs];
    signs.splice(index, 1);
    signs.splice(index - 1, 0, sign);
    this.signs = signs;
    this.form.markAsDirty();
  }

  public moveSignDown(index: number): void {
    if (index + 1 >= this.signs.length) {
      return;
    }
    const sign = this.signs[index];
    const signs = [...this.signs];
    signs.splice(index, 1);
    signs.splice(index + 1, 0, sign);
    this.signs = signs;
    this.form.markAsDirty();
  }
}
