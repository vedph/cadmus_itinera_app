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
import { Chronotope, CorrExchange } from '@myrmidon/cadmus-itinera-core';
import {
  CorrExchangesPart,
  CORR_EXCHANGES_PART_TYPEID,
} from '../corr-exchanges-part';
import { take } from 'rxjs/operators';

/**
 * Correspondent's exchanges part.
 * Thesauri: doc-reference-tags, chronotope-tags, epist-attachment-types
 * (all optional).
 */
@Component({
  selector: 'itinera-corr-exchanges-part',
  templateUrl: './corr-exchanges-part.component.html',
  styleUrls: ['./corr-exchanges-part.component.css'],
})
export class CorrExchangesPartComponent
  extends ModelEditorComponentBase<CorrExchangesPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedExchange: CorrExchange;

  public tagEntries: ThesaurusEntry[] | undefined;
  public ctTagEntries: ThesaurusEntry[] | undefined;
  public typeEntries: ThesaurusEntry[] | undefined;

  public exchanges: CorrExchange[];

  public count: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    this.exchanges = [];
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: CorrExchangesPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.count.setValue(model.exchanges?.length || 0);
    this.exchanges = model.exchanges || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: CorrExchangesPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'doc-reference-tags';
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

    key = 'epist-attachment-types';
    if (this.thesauri && this.thesauri[key]) {
      this.typeEntries = this.thesauri[key].entries;
    } else {
      this.typeEntries = undefined;
    }
  }

  protected getModelFromForm(): CorrExchangesPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: CORR_EXCHANGES_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        exchanges: [],
      };
    }
    part.exchanges = this.exchanges;
    return part;
  }

  public addExchange(): void {
    const exchange: CorrExchange = {};
    this.exchanges = [...this.exchanges, exchange];
    this.count.setValue(this.exchanges.length);
    this.count.markAsDirty();
    this.editExchange(this.exchanges.length - 1);
  }

  public editExchange(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedExchange = null;
    } else {
      this._editedIndex = index;
      this.editedExchange = this.exchanges[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onExchangeSave(item: CorrExchange): void {
    this.exchanges = this.exchanges.map((s, i) =>
      i === this._editedIndex ? item : s
    );
    this.editExchange(-1);
    this.form.markAsDirty();
  }

  public onExchangeClose(): void {
    this.editExchange(-1);
  }

  public deleteExchange(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete exchange?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const items = [...this.exchanges];
          items.splice(index, 1);
          this.exchanges = items;
          this.count.setValue(this.exchanges.length);
          this.count.markAsDirty();
        }
      });
  }

  public moveExchangeUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.exchanges[index];
    const items = [...this.exchanges];
    items.splice(index, 1);
    items.splice(index - 1, 0, item);
    this.exchanges = items;
    this.form.markAsDirty();
  }

  public moveExchangeDown(index: number): void {
    if (index + 1 >= this.exchanges.length) {
      return;
    }
    const item = this.exchanges[index];
    const items = [...this.exchanges];
    items.splice(index, 1);
    items.splice(index + 1, 0, item);
    this.exchanges = items;
    this.form.markAsDirty();
  }

  public chronotopesToString(chronotopes: Chronotope[]): string {
    if (!chronotopes?.length) {
      return '';
    }
    const sb: string[] = [];

    chronotopes.forEach((c, i) => {
      if (i) {
        sb.push('; ');
      }
      if (c.place) {
        sb.push(c.place);
        sb.push(', ');
      }
      if (c.date) {
        sb.push(new HistoricalDate(c.date).toString());
      }
    });

    return sb.join('');
  }
}
