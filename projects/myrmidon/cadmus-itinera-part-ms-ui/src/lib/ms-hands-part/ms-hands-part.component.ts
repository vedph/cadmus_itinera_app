import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsHandsPart, MSHANDS_PART_TYPEID } from '../ms-hands-part';
import {
  MsHandInstance, MsLocation, MsLocationService,
} from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * Manuscript's hands part.
 * Thesauri: ms-hand-id-reasons, ms-rubrication-types, languages (all optional).
 */
@Component({
  selector: 'cadmus-ms-hands-part',
  templateUrl: './ms-hands-part.component.html',
  styleUrls: ['./ms-hands-part.component.css'],
})
export class MsHandsPartComponent
  extends ModelEditorComponentBase<MsHandsPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedHand: MsHandInstance;

  public reasonEntries: ThesaurusEntry[];
  public rubrEntries: ThesaurusEntry[];
  public langEntries: ThesaurusEntry[];

  public hands: MsHandInstance[];
  public count: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _msLocationService: MsLocationService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    this.hands = [];
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsHandsPart): void {
    if (!model) {
      this.form.reset();
      this.hands = [];
      return;
    }
    this.count.setValue(model.hands?.length || 0);
    this.hands = model.hands || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsHandsPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    let key = 'ms-hand-id-reasons';
    if (this.thesauri && this.thesauri[key]) {
      this.reasonEntries = this.thesauri[key].entries;
    } else {
      this.reasonEntries = null;
    }

    key = 'ms-rubrication-types';
    if (this.thesauri && this.thesauri[key]) {
      this.rubrEntries = this.thesauri[key].entries;
    } else {
      this.rubrEntries = null;
    }

    key = 'languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = null;
    }
  }

  protected getModelFromForm(): MsHandsPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSHANDS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        hands: [],
      };
    }
    part.hands = this.hands;
    return part;
  }

  public addHand(): void {
    const hand: MsHandInstance = {
      id: null,
      idReason: null
    };
    this.hands = [...this.hands, hand];
    this.count.setValue(this.hands.length);
    this.count.markAsDirty();
    this.editHand(this.hands.length - 1);
  }

  public editHand(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedHand = null;
    } else {
      this._editedIndex = index;
      this.editedHand = this.hands[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onHandSaved(hand: MsHandInstance): void {
    this.hands = this.hands.map((s, i) =>
      i === this._editedIndex ? hand : s
    );
    this.editHand(-1);
    this.count.markAsDirty();
  }

  public onHandClosed(): void {
    this.editHand(-1);
  }

  public deleteHand(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete hand?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const hands = [...this.hands];
          hands.splice(index, 1);
          this.hands = hands;
          this.count.setValue(this.hands.length);
          this.count.markAsDirty();
        }
      });
  }

  public moveHandUp(index: number): void {
    if (index < 1) {
      return;
    }
    const hand = this.hands[index];
    const hands = [...this.hands];
    hands.splice(index, 1);
    hands.splice(index - 1, 0, hand);
    this.hands = hands;
  }

  public moveHandDown(index: number): void {
    if (index + 1 >= this.hands.length) {
      return;
    }
    const hand = this.hands[index];
    const hands = [...this.hands];
    hands.splice(index, 1);
    hands.splice(index + 1, 0, hand);
    this.hands = hands;
  }

  public locationToString(location: MsLocation): string {
    return this._msLocationService.locationToString(location);
  }
}