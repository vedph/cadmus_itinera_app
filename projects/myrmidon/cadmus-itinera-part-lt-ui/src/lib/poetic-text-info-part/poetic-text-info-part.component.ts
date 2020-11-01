import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';

import {
  CitedPerson,
  DocReference,
  PersonName,
} from '@myrmidon/cadmus-itinera-core';
import {
  PoeticTextInfoPart,
  POETIC_TEXT_INFO_PART_TYPEID,
} from '../poetic-text-info-part';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

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
  private _editedIndex: number;

  public language: FormControl;
  public metre: FormControl;
  public subject: FormControl;

  public tabIndex: number;
  public authors: CitedPerson[];
  public editedAuthor: CitedPerson;
  public related: DocReference[];
  public related$: BehaviorSubject<DocReference[]>;

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

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this._editedIndex = -1;
    this.tabIndex = 0;
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
      Validators.maxLength(500),
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

  public addAuthor(): void {
    const person: CitedPerson = {
      name: null,
    };
    this.authors = [...this.authors, person];
    this.editAuthor(this.related.length - 1);
  }

  public editAuthor(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedAuthor = null;
    } else {
      this._editedIndex = index;
      this.editedAuthor = this.authors[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onAuthorSaved(item: CitedPerson): void {
    this.authors = this.authors.map((s, i) =>
      i === this._editedIndex ? item : s
    );
    this.form.markAsDirty();
    this.editAuthor(-1);
  }

  public onAuthorClosed(): void {
    this.editAuthor(-1);
  }

  public deleteAuthor(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete author?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const authors = [...this.authors];
          authors.splice(index, 1);
          this.authors = authors;
          this.form.markAsDirty();
        }
      });
  }

  public moveAuthorUp(index: number): void {
    if (index < 1) {
      return;
    }
    const author = this.authors[index];
    const authors = [...this.authors];
    authors.splice(index, 1);
    authors.splice(index - 1, 0, author);
    this.authors = authors;
    this.form.markAsDirty();
  }

  public moveAuthorDown(index: number): void {
    if (index + 1 >= this.authors.length) {
      return;
    }
    const author = this.authors[index];
    const authors = [...this.authors];
    authors.splice(index, 1);
    authors.splice(index + 1, 0, author);
    this.authors = authors;
    this.form.markAsDirty();
  }

  public getFullName(name: PersonName | null): string {
    if (!name) {
      return '';
    }
    const sb: string[] = [];
    for (let i = 0; i < name.parts?.length || 0; i++) {
      sb.push(name.parts[i].value);
    }
    return sb.join(' ');
  }

  public onRelatedChange(related: DocReference[]): void {
    this.related = related;
    this.form.markAsDirty();
  }
}
