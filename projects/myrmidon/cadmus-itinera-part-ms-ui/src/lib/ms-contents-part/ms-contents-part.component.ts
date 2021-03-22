import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsContentsPart, MSCONTENTS_PART_TYPEID } from '../ms-contents-part';
import { MsContent, MsLocation, MsLocationRange, MsLocationService } from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * Manuscript's contents part.
 * Thesauri: ms-content-states (optional).
 */
@Component({
  selector: 'itinera-ms-contents-part',
  templateUrl: './ms-contents-part.component.html',
  styleUrls: ['./ms-contents-part.component.css'],
})
export class MsContentsPartComponent
  extends ModelEditorComponentBase<MsContentsPart>
  implements OnInit {
  private _editedIndex: number;
  public count: FormControl;

  public stateEntries: ThesaurusEntry[];

  public contents: MsContent[];

  public tabIndex: number;
  public editedContent: MsContent;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _locService: MsLocationService,
    private _dialogService: DialogService,
    private _msLocationService: MsLocationService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    this.contents = [];
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsContentsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.count.setValue(model.contents?.length || 0);
    this.contents = model.contents || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsContentsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    const key = 'ms-content-states';
    if (this.thesauri && this.thesauri[key]) {
      this.stateEntries = this.thesauri[key].entries;
    } else {
      this.stateEntries = null;
    }
  }

  protected getModelFromForm(): MsContentsPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSCONTENTS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        contents: [],
      };
    }
    part.contents = this.contents;
    return part;
  }

  public addContent(): void {
    const content: MsContent = {
      work: null,
    };
    this.contents = [...this.contents, content];
    this.count.setValue(this.contents.length);
    this.count.markAsDirty();
    this.editContent(this.contents.length - 1);
  }

  public editContent(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedContent = null;
    } else {
      this._editedIndex = index;
      this.editedContent = this.contents[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onContentSaved(sheet: MsContent): void {
    this.contents = this.contents.map((s, i) =>
      i === this._editedIndex ? sheet : s
    );
    this.editContent(-1);
    this.count.markAsDirty();
  }

  public onContentClosed(): void {
    this.editContent(-1);
  }

  public deleteContent(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete content?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const sheets = [...this.contents];
          sheets.splice(index, 1);
          this.contents = sheets;
          this.count.setValue(this.contents.length);
          this.count.markAsDirty();
        }
      });
  }

  public moveContentUp(index: number): void {
    if (index < 1) {
      return;
    }
    const sheet = this.contents[index];
    const sheets = [...this.contents];
    sheets.splice(index, 1);
    sheets.splice(index - 1, 0, sheet);
    this.contents = sheets;
    this.form.markAsDirty();
  }

  public moveContentDown(index: number): void {
    if (index + 1 >= this.contents.length) {
      return;
    }
    const sheet = this.contents[index];
    const sheets = [...this.contents];
    sheets.splice(index, 1);
    sheets.splice(index + 1, 0, sheet);
    this.contents = sheets;
    this.form.markAsDirty();
  }

  public locationToString(location: MsLocation): string {
    return this._msLocationService.locationToString(location);
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
