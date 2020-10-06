import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { PersonPart, PERSON_PART_TYPEID } from '../person-part';

/**
 * Person part.
 */
@Component({
  selector: 'lib-person-part',
  templateUrl: './person-part.component.html',
  styleUrls: ['./person-part.component.css'],
})
export class PersonPartComponent
  extends ModelEditorComponentBase<PersonPart>
  implements OnInit {
  public langEntries: ThesaurusEntry[];
  public tagEntries: ThesaurusEntry[];
  public typeEntries: ThesaurusEntry[];

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  public personId: FormControl;
  public sex: FormControl;

  public birthPlace: FormControl;
  public deathPlace: FormControl;

  public bio: FormControl;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // form
    this.personId = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.sex = formBuilder.control(null, Validators.maxLength(1));

    this.birthPlace = formBuilder.control(null, Validators.maxLength(50));
    this.deathPlace = formBuilder.control(null, Validators.maxLength(50));

    this.bio = formBuilder.control(null, Validators.maxLength(6000));
    this.form = formBuilder.group({
      personId: this.personId,
      sex: this.sex,
      birthPlace: this.birthPlace,
      deathPlace: this.deathPlace
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: PersonPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    // this.tag.setValue(model.tag);
    this.form.markAsPristine();
  }

  protected onModelSet(model: PersonPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    // languages
    let key = 'languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = null;
    }
    // person-name-types
    key = 'person-name-types';
    if (this.thesauri && this.thesauri[key]) {
      this.typeEntries = this.thesauri[key].entries;
    } else {
      this.typeEntries = null;
    }
    // person-name-tags
    key = 'person-name-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): PersonPart {
    let part = this.getModelFromJson();
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
        // TODO:
        personId: null,
        names: [],
      };
    }
    // part.tag = this.tagEntries ? this.tags.value : this.tag.value;
    // part.text = this.text.value ? this.text.value.trim() : null;
    return part;
  }
}
