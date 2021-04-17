import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';

import {
  CitedPersonsPart,
  CITED_PERSONS_PART_TYPEID,
} from '../cited-persons-part';
import { CitedPerson, PersonName } from '@myrmidon/cadmus-itinera-core';

/**
 * Cited persons part editor.
 * Thesauri: person-name-languages, person-name-tags, person-name-types,
 * person-id-tags (all optional).
 */
@Component({
  selector: 'itinera-cited-persons-part',
  templateUrl: './cited-persons-part.component.html',
  styleUrls: ['./cited-persons-part.component.css'],
})
export class CitedPersonsPartComponent
  extends ModelEditorComponentBase<CitedPersonsPart>
  implements OnInit {

  public tabIndex: number;
  public editedPerson: CitedPerson;

  // person-name-languages
  public langEntries: ThesaurusEntry[] | undefined;
  // person-name-tags
  public nameTagEntries: ThesaurusEntry[] | undefined;
  // person-name-types
  public nameTypeEntries: ThesaurusEntry[] | undefined;
  // person-id-tags
  public idTagEntries: ThesaurusEntry[] | undefined;

  public persons: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder
  ) {
    super(authService);
    this.tabIndex = 0;
    // form
    this.persons = formBuilder.control([], Validators.required);
    this.form = formBuilder.group({
      persons: this.persons
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: CitedPersonsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.persons.setValue(model.persons || []);
    this.form.markAsPristine();
  }

  protected onModelSet(model: CitedPersonsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = undefined;
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
  }

  protected getModelFromForm(): CitedPersonsPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: CITED_PERSONS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        persons: [],
      };
    }
    part.persons = this.persons;
    return part;
  }

  public onPersonsChange(persons: CitedPerson[]): void {
    this.persons.setValue(persons);
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
}
