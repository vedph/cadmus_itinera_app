import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';

import {
  CitedPersonsPart,
  CITED_PERSONS_PART_TYPEID,
} from '../cited-persons-part';
import { CitedPerson, PersonName } from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * Cited persons part editor.
 * Thesauri: doc-reference-tags, languages, person-name-types, person-id-tags (all optional).
 */
@Component({
  selector: 'cadmus-cited-persons-part',
  templateUrl: './cited-persons-part.component.html',
  styleUrls: ['./cited-persons-part.component.css'],
})
export class CitedPersonsPartComponent
  extends ModelEditorComponentBase<CitedPersonsPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedPerson: CitedPerson;

  public langEntries: ThesaurusEntry[];
  public nameTagEntries: ThesaurusEntry[];
  public nameTypeEntries: ThesaurusEntry[];
  public idTagEntries: ThesaurusEntry[];

  public persons: CitedPerson[];

  public count: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    this.persons = [];
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
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
    this.count.setValue(model.persons?.length || 0);
    this.persons = model.persons || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: CitedPersonsPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    let key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.nameTagEntries = this.thesauri[key].entries;
    } else {
      this.nameTagEntries = null;
    }

    key = 'languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = null;
    }

    key = 'person-name-types';
    if (this.thesauri && this.thesauri[key]) {
      this.nameTypeEntries = this.thesauri[key].entries;
    } else {
      this.nameTypeEntries = null;
    }

    key = 'person-id-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.idTagEntries = this.thesauri[key].entries;
    } else {
      this.idTagEntries = null;
    }
  }

  protected getModelFromForm(): CitedPersonsPart {
    let part = this.getModelFromJson();
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

  public addPerson(): void {
    const person: CitedPerson = {
      name: null,
    };
    this.persons = [...this.persons, person];
    this.count.setValue(this.persons.length);
    this.count.markAsDirty();
    this.editPerson(this.persons.length - 1);
  }

  public editPerson(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedPerson = null;
    } else {
      this._editedIndex = index;
      this.editedPerson = this.persons[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onPersonSaved(item: CitedPerson): void {
    this.persons = this.persons.map((s, i) =>
      i === this._editedIndex ? item : s
    );
    this.editPerson(-1);
    this.count.markAsDirty();
  }

  public onPersonClosed(): void {
    this.editPerson(-1);
  }

  public deletePerson(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete person?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const persons = [...this.persons];
          persons.splice(index, 1);
          this.persons = persons;
          this.count.setValue(this.persons.length);
          this.count.markAsDirty();
        }
      });
  }

  public movePersonUp(index: number): void {
    if (index < 1) {
      return;
    }
    const person = this.persons[index];
    const persons = [...this.persons];
    persons.splice(index, 1);
    persons.splice(index - 1, 0, person);
    this.persons = persons;
  }

  public movePersonDown(index: number): void {
    if (index + 1 >= this.persons.length) {
      return;
    }
    const person = this.persons[index];
    const persons = [...this.persons];
    persons.splice(index, 1);
    persons.splice(index + 1, 0, person);
    this.persons = persons;
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
