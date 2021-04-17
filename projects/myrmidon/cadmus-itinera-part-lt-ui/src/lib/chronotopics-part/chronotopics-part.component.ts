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
  public editedChronotope: Chronotope;

  public tagEntries: ThesaurusEntry[] | undefined;
  public docRefTagEntries: ThesaurusEntry[] | undefined;

  public chronotopes: Chronotope[];

  public count: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    this.chronotopes = [];
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
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
    this.count.setValue(model.chronotopes?.length || 0);
    this.chronotopes = model.chronotopes || [];
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
    part.chronotopes = this.chronotopes;
    return part;
  }

  public addChronotope(): void {
    const chronotope: Chronotope = {
      place: null,
      date: null,
    };
    this.chronotopes = [...this.chronotopes, chronotope];
    this.count.setValue(this.chronotopes.length);
    this.count.markAsDirty();
    this.editChronotope(this.chronotopes.length - 1);
  }

  public editChronotope(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedChronotope = null;
    } else {
      this._editedIndex = index;
      this.editedChronotope = this.chronotopes[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onChronotopeSave(chronotope: Chronotope): void {
    this.chronotopes = this.chronotopes.map((s, i) =>
      i === this._editedIndex ? chronotope : s
    );
    this.editChronotope(-1);
    this.count.markAsDirty();
  }

  public onChronotopeClose(): void {
    this.editChronotope(-1);
  }

  public deleteChronotope(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete chronotope?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const chronotopes = [...this.chronotopes];
          chronotopes.splice(index, 1);
          this.chronotopes = chronotopes;
          this.count.setValue(this.chronotopes.length);
          this.count.markAsDirty();
        }
      });
  }

  public moveChronotopeUp(index: number): void {
    if (index < 1) {
      return;
    }
    const chronotope = this.chronotopes[index];
    const chronotopes = [...this.chronotopes];
    chronotopes.splice(index, 1);
    chronotopes.splice(index - 1, 0, chronotope);
    this.chronotopes = chronotopes;
    this.form.markAsDirty();
  }

  public moveChronotopeDown(index: number): void {
    if (index + 1 >= this.chronotopes.length) {
      return;
    }
    const chronotope = this.chronotopes[index];
    const chronotopes = [...this.chronotopes];
    chronotopes.splice(index, 1);
    chronotopes.splice(index + 1, 0, chronotope);
    this.chronotopes = chronotopes;
    this.form.markAsDirty();
  }

  public dateToString(date: HistoricalDateModel | null): string {
    return date ? new HistoricalDate(date).toString() : '';
  }
}
