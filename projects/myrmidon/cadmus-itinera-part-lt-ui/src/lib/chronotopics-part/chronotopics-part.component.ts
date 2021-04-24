import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import {
  deepCopy,
  HistoricalDate,
  HistoricalDateModel,
  ThesaurusEntry,
} from '@myrmidon/cadmus-core';

import {
  ChronotopicsPart,
  CHRONOTOPICS_PART_TYPEID,
} from '../chronotopics-part';
import { Chronotope } from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * Chronotopics part editor.
 * Thesauri: chronotope-tags, doc-reference-tags (optional).
 */
@Component({
  selector: 'itinera-chronotopics-part',
  templateUrl: './chronotopics-part.component.html',
  styleUrls: ['./chronotopics-part.component.css'],
})
export class ChronotopicsPartComponent
  extends ModelEditorComponentBase<ChronotopicsPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedChronotope: Chronotope | undefined;

  public tagEntries: ThesaurusEntry[] | undefined;
  public docRefTagEntries: ThesaurusEntry[] | undefined;

  public chronotopes: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    // form
    this.chronotopes = formBuilder.control([], Validators.required);
    this.form = formBuilder.group({
      chronotopes: this.chronotopes,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: ChronotopicsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.chronotopes.setValue(model.chronotopes || []);
    this.form.markAsPristine();
  }

  protected onModelSet(model: ChronotopicsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'chronotope-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = undefined;
    }

    key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.docRefTagEntries = this.thesauri[key].entries;
    } else {
      this.docRefTagEntries = undefined;
    }
  }

  protected getModelFromForm(): ChronotopicsPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: CHRONOTOPICS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        chronotopes: [],
      };
    }
    part.chronotopes.setValue(this.chronotopes.value);
    return part;
  }

  private closeChronotopeEditor(): void {
    this._editedIndex = -1;
    this.tabIndex = 0;
    this.editedChronotope = undefined;
  }

  public addChronotope(): void {
    this._editedIndex = -1;
    this.editedChronotope = {};
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public editChronotope(index: number): void {
    this._editedIndex = index;
    this.editedChronotope = this.chronotopes.value[index];
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public onChronotopeChange(chronotope: Chronotope): void {
    if (this._editedIndex === -1) {
      this.chronotopes.value.push(chronotope);
    } else {
      this.chronotopes.value.splice(this._editedIndex, 1, chronotope);
    }
    this.closeChronotopeEditor();
    this.form.markAsDirty();
  }

  public onChronotopeClose(): void {
    this.closeChronotopeEditor();
  }

  public deleteChronotope(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete chronotope?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.closeChronotopeEditor();
          this.chronotopes.value.splice(index, 1);
          this.form.markAsDirty();
        }
      });
  }

  public moveChronotopeUp(index: number): void {
    if (index < 1) {
      return;
    }
    this.closeChronotopeEditor();
    const chronotope = this.chronotopes.value[index];
    const chronotopes = [...this.chronotopes.value];
    chronotopes.splice(index, 1);
    chronotopes.splice(index - 1, 0, chronotope);
    this.chronotopes.setValue(chronotopes);
    this.form.markAsDirty();
  }

  public moveChronotopeDown(index: number): void {
    if (index + 1 >= this.chronotopes.value.length) {
      return;
    }
    this.closeChronotopeEditor();
    const chronotope = this.chronotopes.value[index];
    const chronotopes = [...this.chronotopes.value];
    chronotopes.splice(index, 1);
    chronotopes.splice(index + 1, 0, chronotope);
    this.chronotopes.setValue(chronotopes);
    this.form.markAsDirty();
  }

  public dateToString(date: HistoricalDateModel | null): string {
    return date ? new HistoricalDate(date).toString() : '';
  }
}
