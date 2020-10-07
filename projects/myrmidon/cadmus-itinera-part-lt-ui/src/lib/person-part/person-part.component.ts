import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@myrmidon/cadmus-api';
import { HistoricalDate, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { PersonName } from '@myrmidon/cadmus-itinera-core';
import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { BehaviorSubject } from 'rxjs';
import { PersonPart, PERSON_PART_TYPEID } from '../person-part';

/**
 * Person part.
 */
@Component({
  selector: 'cadmus-person-part',
  templateUrl: './person-part.component.html',
  styleUrls: ['./person-part.component.css'],
})
export class PersonPartComponent
  extends ModelEditorComponentBase<PersonPart>
  implements OnInit {
  private _externalIds: string[];

  public nameIndex: number;
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

  public externalIds$: BehaviorSubject<string[]>;
  public birthDate: HistoricalDate;
  public deathDate: HistoricalDate;
  public names$: BehaviorSubject<PersonName[]>;
  public name$: BehaviorSubject<PersonName>;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    this.nameIndex = -1;
    // subjects
    this.externalIds$ = new BehaviorSubject<string[]>([]);
    this.name$ = new BehaviorSubject<PersonName>({
      language: 'ita',
      parts: [],
    });
    this.names$ = new BehaviorSubject<PersonName[]>([]);

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
      deathPlace: this.deathPlace,
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
    this.personId.setValue(model.personId);
    this.externalIds$.next(model.externalIds || []);
    this.names$.next(model.names || []);
    this.sex.setValue(model.sex);
    this.birthDate = model.birthDate;
    this.birthPlace.setValue(model.birthPlace);
    this.deathDate = model.deathDate;
    this.deathPlace.setValue(model.deathPlace);
    this.bio.setValue(model.bio);
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
        personId: null,
        names: [],
      };
    }
    part.personId = this.personId.value;
    part.externalIds = this._externalIds;
    part.names = this.names$.value || [];
    part.sex = this.sex.value;
    part.birthDate = this.birthDate;
    part.birthPlace = this.birthPlace.value?.trim() || null;
    part.deathDate = this.deathDate;
    part.deathPlace = this.deathPlace.value?.trim() || null;
    part.bio = this.bio.value?.trim() || null;
    return part;
  }

  public onExternalIdsChange(ids: string[]): void {
    this._externalIds = ids || [];
  }

  public getFullName(name: PersonName): string {
    const sb: string[] = [];
    for (let i = 0; i < name.parts?.length || 0; i++) {
      sb.push(name.parts[i].value);
    }
    return sb.join(' ');
  }

  public editNameAt(index: number): void {
    this.name$.next(this.names$.value[index]);
    this.nameIndex = index;
  }

  public removeNameAt(index: number): void {
    // TODO prompt
    const updated: PersonName[] = this.names$.value;
    updated.splice(index, 1);
    this.names$.next(updated);
  }

  public moveNameUp(index: number): void {
    if (index < 1) {
      return;
    }
    const name = this.names$.value[index];
    const updated: PersonName[] = this.names$.value;
    updated.splice(index, 1);
    updated.splice(index - 1, 0, name);
    this.names$.next(updated);
  }

  public moveNameDown(index: number): void {
    if (index + 1 >= this.names$.value.length) {
      return;
    }
    const name = this.names$.value[index];
    const updated: PersonName[] = this.names$.value;
    updated.splice(index, 1);
    updated.splice(index + 1, 0, name);
    this.names$.next(updated);
  }

  public addName(): void {
    const updated: PersonName[] = this.names$.value;
    updated.push({
      language: 'ita',
      parts: [],
    });
    this.names$.next(updated);
    this.editNameAt(updated.length - 1);
  }

  public onNameChange(name: PersonName): void {
    if (this.nameIndex < 0 || this.nameIndex >= this.names$.value.length) {
      return;
    }
    const updated: PersonName[] = this.names$.value;
    updated.splice(this.nameIndex, 1, name);
    this.names$.next(updated);
  }
}
