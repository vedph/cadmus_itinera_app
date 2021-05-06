import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import {
  ThesaurusEntry,
  deepCopy,
  CadmusValidators,
} from '@myrmidon/cadmus-core';
import {
  PersonWork,
  PersonWorksPart,
  PERSON_WORKS_PART_TYPEID,
} from '../person-works-part';
import { take } from 'rxjs/operators';

/**
 * Person works part editor component.
 * Thesauri: person-work-languages, person-work-genres, doc-reference-tags,
 * chronotope-tags (all optional).
 */
@Component({
  selector: 'itinera-person-works-part',
  templateUrl: './person-works-part.component.html',
  styleUrls: ['./person-works-part.component.css'],
})
export class PersonWorksPartComponent
  extends ModelEditorComponentBase<PersonWorksPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedWork: PersonWork | undefined;

  // person-work-languages
  public langEntries: ThesaurusEntry[] | undefined;
  // person-work-genres
  public genreEntries: ThesaurusEntry[] | undefined;
  // doc-reference-tags
  public tagEntries: ThesaurusEntry[] | undefined;
  // chronotope-tags
  public ctTagEntries: ThesaurusEntry[] | undefined;

  public works: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this._editedIndex = -1;
    this.tabIndex = 0;
    // form
    this.works = formBuilder.control(
      [],
      CadmusValidators.strictMinLengthValidator(1)
    );
    this.form = formBuilder.group({
      works: this.works,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: PersonWorksPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.works.setValue(model.works || []);
    this.form.markAsPristine();
  }

  protected onModelSet(model: PersonWorksPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'person-work-languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = undefined;
    }

    key = 'person-work-genres';
    if (this.thesauri && this.thesauri[key]) {
      this.genreEntries = this.thesauri[key].entries;
    } else {
      this.genreEntries = undefined;
    }

    key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = undefined;
    }

    key = 'chronotope-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.ctTagEntries = this.thesauri[key].entries;
    } else {
      this.ctTagEntries = undefined;
    }
  }

  protected getModelFromForm(): PersonWorksPart {
    let part = this.model;
    if (!part) {
      part = {
        itemId: this.itemId,
        id: '',
        typeId: PERSON_WORKS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: '',
        timeModified: new Date(),
        userId: '',
        works: [],
      };
    }
    part.works = this.works.value || [];
    return part;
  }

  public addWork(): void {
    this.editedWork = {
      language: 'ita',
      titles: [],
    };
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public editWork(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedWork = undefined;
    } else {
      this._editedIndex = index;
      this.editedWork = this.works.value[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  private closeWorkEditor(): void {
    this.editedWork = undefined;
    this.tabIndex = 0;
  }

  public onWorkSave(entry: PersonWork): void {
    this.works.setValue(
      this.works.value.map((e: PersonWork, i: number) =>
        i === this._editedIndex ? entry : e
      )
    );
    this.closeWorkEditor();
  }

  public onWorkClose(): void {
    this.closeWorkEditor();
  }

  public deleteWork(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete work?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.closeWorkEditor();
          this.works.value.splice(index, 1);
          this.works.updateValueAndValidity();
          this.form.markAsDirty();
        }
      });
  }

  public moveWorkUp(index: number): void {
    if (index < 1) {
      return;
    }
    const entry = this.works.value[index];
    const entries = [...this.works.value];
    entries.splice(index, 1);
    entries.splice(index - 1, 0, entry);
    this.works.setValue(entries);
  }

  public moveWorkDown(index: number): void {
    if (index + 1 >= this.works.value.length) {
      return;
    }
    const entry = this.works.value[index];
    const entries = [...this.works.value];
    entries.splice(index, 1);
    entries.splice(index + 1, 0, entry);
    this.works.setValue(entries);
  }
}
