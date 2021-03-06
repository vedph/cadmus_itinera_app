import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { CadmusValidators, deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsHandsPart, MSHANDS_PART_TYPEID } from '../ms-hands-part';
import {
  MsHand,
  MsLocation,
  MsLocationRange,
  MsLocationService,
} from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * Manuscript's hands part.
 * Thesauri: ms-hand-id-reasons, ms-hand-types, ms-hand-sign-types,
 * ms-rubrication-types, ms-hand-languages, ms-hand-note-props (all optional).
 */
@Component({
  selector: 'itinera-ms-hands-part',
  templateUrl: './ms-hands-part.component.html',
  styleUrls: ['./ms-hands-part.component.css'],
})
export class MsHandsPartComponent
  extends ModelEditorComponentBase<MsHandsPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedHand: MsHand | undefined;

  public hands: FormControl;

  public handTypeEntries: ThesaurusEntry[] | undefined;
  public signTypeEntries: ThesaurusEntry[] | undefined;
  public reasonEntries: ThesaurusEntry[] | undefined;
  public rubrEntries: ThesaurusEntry[] | undefined;
  public langEntries: ThesaurusEntry[] | undefined;
  // ms-hand-note-props is used to label the MsHand note-properties
  public handNotePropEntries: ThesaurusEntry[] | undefined;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _locService: MsLocationService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    // form
    this.hands = formBuilder.control([],
      CadmusValidators.strictMinLengthValidator(1));
    this.form = formBuilder.group({
      hands: this.hands,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsHandsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.hands.setValue(model.hands || []);
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsHandsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'ms-hand-types';
    if (this.thesauri && this.thesauri[key]) {
      this.handTypeEntries = this.thesauri[key].entries;
    } else {
      this.handTypeEntries = undefined;
    }

    key = 'ms-hand-sign-types';
    if (this.thesauri && this.thesauri[key]) {
      this.signTypeEntries = this.thesauri[key].entries;
    } else {
      this.signTypeEntries = undefined;
    }

    key = 'ms-hand-id-reasons';
    if (this.thesauri && this.thesauri[key]) {
      this.reasonEntries = this.thesauri[key].entries;
    } else {
      this.reasonEntries = undefined;
    }

    key = 'ms-rubrication-types';
    if (this.thesauri && this.thesauri[key]) {
      this.rubrEntries = this.thesauri[key].entries;
    } else {
      this.rubrEntries = undefined;
    }

    key = 'ms-hand-languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = undefined;
    }

    key = 'ms-hand-note-props';
    if (this.thesauri && this.thesauri[key]) {
      this.handNotePropEntries = this.thesauri[key].entries;
    } else {
      this.handNotePropEntries = undefined;
    }
  }

  protected getModelFromForm(): MsHandsPart {
    let part = deepCopy(this.model);
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
    part.hands = this.hands.value;
    return part;
  }

  private closeHandEditor(): void {
    this._editedIndex = -1;
    this.tabIndex = 0;
    this.editedHand = undefined;
  }

  public addHand(): void {
    this._editedIndex = -1;
    this.editedHand = {
      id: null,
      idReason: null,
      types: [],
      description: null,
      ranges: [],
    };
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public editHand(index: number): void {
    this._editedIndex = index;
    this.editedHand = this.hands.value[index];
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public onHandChange(hand: MsHand): void {
    if (this._editedIndex === -1) {
      this.hands.value.push(hand);
    } else {
      this.hands.value.splice(this._editedIndex, 1, hand);
    }
    this.closeHandEditor();
    this.hands.updateValueAndValidity();
    this.form.markAsDirty();
  }

  public onHandClose(): void {
    this.closeHandEditor();
  }

  public deleteHand(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete hand?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.closeHandEditor();
          this.hands.value.splice(index, 1);
          this.hands.updateValueAndValidity();
          this.form.markAsDirty();
        }
      });
  }

  public moveHandUp(index: number): void {
    if (index < 1) {
      return;
    }
    this.closeHandEditor();
    const hand = this.hands.value[index];
    const hands = [...this.hands.value];
    hands.splice(index, 1);
    hands.splice(index - 1, 0, hand);
    this.hands.setValue(hands);
  }

  public moveHandDown(index: number): void {
    if (index + 1 >= this.hands.value.length) {
      return;
    }
    this.closeHandEditor();
    const hand = this.hands.value[index];
    const hands = [...this.hands.value];
    hands.splice(index, 1);
    hands.splice(index + 1, 0, hand);
    this.hands.setValue(hands);
  }

  public locationToString(location: MsLocation): string {
    return this._locService.locationToString(location);
  }

  public typesToString(types: string[] | undefined): string {
    if (!types.length) {
      return '';
    }
    const tokens = types.map((t: string) => {
      return (
        this.handTypeEntries?.find((e) => {
          return e.id === t;
        })?.value || t
      );
    });
    return tokens.join(', ');
  }

  public rangesToString(ranges: MsLocationRange[] | undefined): string {
    if (!ranges?.length) {
      return '';
    }
    const tokens = ranges.map((r) => {
      return `${this._locService.locationToString(
        r.start
      )}-${this._locService.locationToString(r.end)}`;
    });
    return tokens.join(' ');
  }
}
