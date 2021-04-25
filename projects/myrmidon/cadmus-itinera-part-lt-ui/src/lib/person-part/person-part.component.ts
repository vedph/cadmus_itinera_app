import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { Chronotope, PersonName } from '@myrmidon/cadmus-itinera-core';
import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { PersonPart, PERSON_PART_TYPEID } from '../person-part';

/**
 * Person part.
 * Thesauri (all optional): person-name-languages, doc-reference-tags,
 * person-name-types, chronotope-tags, person-name-tags.
 */
@Component({
  selector: 'itinera-person-part',
  templateUrl: './person-part.component.html',
  styleUrls: ['./person-part.component.css'],
})
export class PersonPartComponent
  extends ModelEditorComponentBase<PersonPart>
  implements OnInit {
  public nameIndex: number;
  // person-name-languages
  public langEntries: ThesaurusEntry[] | undefined;
  // doc-reference-tags
  public tagEntries: ThesaurusEntry[] | undefined;
  // person-name-tags
  public pnTagEntries: ThesaurusEntry[] | undefined;
  // chronotope-tags
  public ctTagEntries: ThesaurusEntry[] | undefined;
  // person-name-types
  public pnTypeEntries: ThesaurusEntry[] | undefined;

  @ViewChild('editorbio') bioEditor: any;

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  public personId: FormControl;
  public sex: FormControl;
  public names: FormControl;
  public bio: FormControl;
  public ids: FormControl;
  public chronotopes: FormControl;

  public initialIds: string[];
  public initialName: PersonName | undefined;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.nameIndex = -1;
    this.initialIds = [];

    // form
    this.personId = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.sex = formBuilder.control(null, Validators.maxLength(1));
    this.names = formBuilder.control([], Validators.required);
    this.bio = formBuilder.control(null, Validators.maxLength(6000));
    this.ids = formBuilder.control([]);
    this.chronotopes = formBuilder.control([]);
    this.form = formBuilder.group({
      personId: this.personId,
      sex: this.sex,
      names: this.names,
      bio: this.bio,
      ids: this.ids,
      chronotopes: this.chronotopes,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  public onTabIndexChange(index: number): void {
    // HACK
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    // https://stackoverflow.com/questions/37412950/ngx-monaco-editor-unable-to-set-layout-size-when-container-changes-using-tab
    if (index === 2) {
      setTimeout(() => {
        this.bioEditor._editor.layout();
      }, 100);
    }
  }

  private updateForm(model: PersonPart): void {
    this.closeNameEditor();
    if (!model) {
      this.initialIds = [];
      this.form.reset();
      return;
    }
    this.personId.setValue(model.personId);
    this.initialIds = model.externalIds || [];
    this.names.setValue(model.names || []);
    this.sex.setValue(model.sex);
    this.chronotopes.setValue(model.chronotopes);
    this.bio.setValue(model.bio);
    this.form.markAsPristine();
  }

  protected onModelSet(model: PersonPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    // person-name-languages
    let key = 'person-name-languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = undefined;
    }
    // person-name-types
    key = 'person-name-types';
    if (this.thesauri && this.thesauri[key]) {
      this.pnTypeEntries = this.thesauri[key].entries;
    } else {
      this.pnTypeEntries = undefined;
    }
    // person-name-tags
    key = 'person-name-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.pnTagEntries = this.thesauri[key].entries;
    } else {
      this.pnTagEntries = undefined;
    }
    // chronotope-tags
    key = 'chronotope-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.ctTagEntries = this.thesauri[key].entries;
    } else {
      this.ctTagEntries = undefined;
    }
    // doc-reference-tags
    key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = undefined;
    }
  }

  protected getModelFromForm(): PersonPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: PERSON_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        personId: null,
        names: [],
      };
    }
    part.personId = this.personId.value;
    part.externalIds = this.ids.value?.length ? this.ids.value : undefined;
    part.names = this.names.value || [];
    part.sex = this.sex.value;
    part.chronotopes = this.chronotopes.value?.length
      ? this.chronotopes.value
      : undefined;
    part.bio = this.bio.value?.trim() || null;
    return part;
  }

  public onIdsChange(ids: string[]): void {
    this.ids.setValue(ids);
    this.form.markAsDirty();
  }

  private closeNameEditor(): void {
    this.nameIndex = -1;
    this.initialName = undefined;
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

  public addName(): void {
    this.nameIndex = -1;
    this.initialName = {
      language: 'ita',
      parts: [],
    };
  }

  public editName(index: number): void {
    this.initialName = this.names.value[index];
    this.nameIndex = index;
  }

  public removeName(index: number): void {
    this._dialogService
      .confirm('Confirm Deletion', 'Delete name?')
      .subscribe((yes) => {
        if (!yes) {
          return;
        }
        this.closeNameEditor();
        this.names.value.splice(index, 1);
        this.form.markAsDirty();
      });
  }

  public moveNameUp(index: number): void {
    if (index < 1) {
      return;
    }
    this.closeNameEditor();
    const name = this.names.value[index];
    const names = [...this.names.value];
    names.splice(index, 1);
    names.splice(index - 1, 0, name);
    this.names.setValue(names);
    this.form.markAsDirty();
  }

  public moveNameDown(index: number): void {
    if (index + 1 >= this.names.value.length) {
      return;
    }
    this.closeNameEditor();
    const name = this.names.value[index];
    const names = [...this.names.value];
    names.splice(index, 1);
    names.splice(index + 1, 0, name);
    this.names.setValue(names);
    this.form.markAsDirty();
  }

  public onNameChange(name: PersonName): void {
    if (this.nameIndex === -1) {
      this.names.value.push(name);
      this.nameIndex = this.names.value.length - 1;
    } else {
      this.names.value.splice(this.nameIndex, 1, name);
    }
    this.form.markAsDirty();
  }

  public onChronotopesChange(chronotopes: Chronotope[] | undefined): void {
    this.chronotopes.setValue(chronotopes);
    this.form.markAsDirty();
  }
}
