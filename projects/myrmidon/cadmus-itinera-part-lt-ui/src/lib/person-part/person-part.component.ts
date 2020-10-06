import { Component, OnInit } from '@angular/core';
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
    // form
    // this.tag = formBuilder.control(null, Validators.maxLength(100));
    // this.tags = formBuilder.control([]);
    // this.form = formBuilder.group({
    //   tag: this.tag,
    //   tags: this.tags
    // });
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
    const key = 'person-tags';
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
        names: []
      };
    }
    // part.tag = this.tagEntries ? this.tags.value : this.tag.value;
    // part.text = this.text.value ? this.text.value.trim() : null;
    return part;
  }
}
