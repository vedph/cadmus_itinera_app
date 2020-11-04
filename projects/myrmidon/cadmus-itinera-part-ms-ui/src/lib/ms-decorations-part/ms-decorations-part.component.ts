import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsDecoration, MsLocation, MsLocationService } from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';
import { MsDecorationsPart, MSDECORATIONS_PART_TYPEID } from '../ms-decorations-part';

/**
 * Manuscript's decorations part.
 * Thesauri: ms-decoration-types, ms-decoration-layouts, ms-decoration-tools,
 * ms-decoration-positions, ms-guide-positions, ms-artist-types,
 * ms-decoration-colors (all optional); physical-size-tags (optional),
 * physical-dimension-tags (optional), physical-size-units.
 */
@Component({
  selector: 'cadmus-ms-decorations-part',
  templateUrl: './ms-decorations-part.component.html',
  styleUrls: ['./ms-decorations-part.component.css'],
})
export class MsDecorationsPartComponent
  extends ModelEditorComponentBase<MsDecorationsPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedDecoration: MsDecoration;

  public subjectEntries: ThesaurusEntry[];

  public decorations: MsDecoration[];

  public count: FormControl;

  @Input()
  public typeEntries: ThesaurusEntry[];
  @Input()
  public layoutEntries: ThesaurusEntry[];
  @Input()
  public toolEntries: ThesaurusEntry[];
  @Input()
  public posEntries: ThesaurusEntry[];
  @Input()
  public guidePosEntries: ThesaurusEntry[];
  @Input()
  public artTypeEntries: ThesaurusEntry[];
  @Input()
  public colorEntries: ThesaurusEntry[];
  @Input()
  public unitEntries: ThesaurusEntry[];
  @Input()
  public sizeTagEntries: ThesaurusEntry[];
  @Input()
  public dimTagEntries: ThesaurusEntry[];

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _msLocationService: MsLocationService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    this.decorations = [];
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsDecorationsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.count.setValue(model.decorations?.length || 0);
    this.decorations = model.decorations || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsDecorationsPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    let key = 'ms-decoration-types';
    if (this.thesauri && this.thesauri[key]) {
      this.typeEntries = this.thesauri[key].entries;
    } else {
      this.typeEntries = null;
    }

    key = 'ms-decoration-layouts';
    if (this.thesauri && this.thesauri[key]) {
      this.layoutEntries = this.thesauri[key].entries;
    } else {
      this.layoutEntries = null;
    }

    key = 'ms-decoration-tools';
    if (this.thesauri && this.thesauri[key]) {
      this.toolEntries = this.thesauri[key].entries;
    } else {
      this.toolEntries = null;
    }

    key = 'ms-decoration-positions';
    if (this.thesauri && this.thesauri[key]) {
      this.posEntries = this.thesauri[key].entries;
    } else {
      this.posEntries = null;
    }

    key = 'ms-guide-positions';
    if (this.thesauri && this.thesauri[key]) {
      this.guidePosEntries = this.thesauri[key].entries;
    } else {
      this.guidePosEntries = null;
    }

    key = 'ms-artist-types';
    if (this.thesauri && this.thesauri[key]) {
      this.artTypeEntries = this.thesauri[key].entries;
    } else {
      this.artTypeEntries = null;
    }

    key = 'ms-decoration-colors';
    if (this.thesauri && this.thesauri[key]) {
      this.colorEntries = this.thesauri[key].entries;
    } else {
      this.colorEntries = null;
    }

    key = 'physical-size-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.sizeTagEntries = this.thesauri[key].entries;
    } else {
      this.sizeTagEntries = null;
    }

    key = 'physical-dimension-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.dimTagEntries = this.thesauri[key].entries;
    } else {
      this.dimTagEntries = null;
    }

    key = 'physical-size-units';
    if (this.thesauri && this.thesauri[key]) {
      this.unitEntries = this.thesauri[key].entries;
    } else {
      this.unitEntries = null;
    }
  }

  protected getModelFromForm(): MsDecorationsPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSDECORATIONS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        decorations: [],
      };
    }
    part.decorations = this.decorations;
    return part;
  }

  public addDecoration(): void {
    const item: MsDecoration = {
      type: null,
      subject: null,
      colors: [],
      layout: null,
      tool: null,
    };
    this.decorations = [...this.decorations, item];
    this.count.setValue(this.decorations.length);
    this.count.markAsDirty();
    this.editDecoration(this.decorations.length - 1);
  }

  public editDecoration(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedDecoration = null;
    } else {
      this._editedIndex = index;
      this.editedDecoration = this.decorations[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onDecorationSaved(item: MsDecoration): void {
    this.decorations = this.decorations.map((s, i) =>
      i === this._editedIndex ? item : s
    );
    this.editDecoration(-1);
    this.count.markAsDirty();
  }

  public onDecorationClosed(): void {
    this.editDecoration(-1);
  }

  public deleteDecoration(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete decoration?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const items = [...this.decorations];
          items.splice(index, 1);
          this.decorations = items;
          this.count.setValue(this.decorations.length);
          this.count.markAsDirty();
        }
      });
  }

  public moveDecorationUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.decorations[index];
    const sheets = [...this.decorations];
    sheets.splice(index, 1);
    sheets.splice(index - 1, 0, item);
    this.decorations = sheets;
    this.form.markAsDirty();
  }

  public moveDecorationDown(index: number): void {
    if (index + 1 >= this.decorations.length) {
      return;
    }
    const item = this.decorations[index];
    const items = [...this.decorations];
    items.splice(index, 1);
    items.splice(index + 1, 0, item);
    this.decorations = items;
    this.form.markAsDirty();
  }

  public locationToString(location: MsLocation): string {
    return this._msLocationService.locationToString(location);
  }
}
