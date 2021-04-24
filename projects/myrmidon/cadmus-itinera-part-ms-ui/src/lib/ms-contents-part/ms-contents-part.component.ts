import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsContentsPart, MSCONTENTS_PART_TYPEID } from '../ms-contents-part';
import {
  MsContent,
  MsLocation,
  MsLocationRange,
  MsLocationService,
} from '@myrmidon/cadmus-itinera-core';
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

  public tabIndex: number;
  public editedContent: MsContent | undefined;

  public contents: FormControl;

  public stateEntries: ThesaurusEntry[] | undefined;

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
    // form
    this.contents = formBuilder.control([], Validators.required);
    this.form = formBuilder.group({
      contents: this.contents,
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
    this.contents.setValue(model.contents || []);
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
      this.stateEntries = undefined;
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

  private closeContentEditor(): void {
    this._editedIndex = -1;
    this.tabIndex = 0;
    this.editedContent = undefined;
  }

  public addContent(): void {
    this._editedIndex = -1;
    this.editedContent = {
      work: null,
    };
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public editContent(index: number): void {
    this._editedIndex = index;
    this.editedContent = this.contents.value[index];
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public onContentChange(content: MsContent): void {
    if (this._editedIndex === -1) {
      this.contents.value.push(content);
    } else {
      this.contents.value.splice(this._editedIndex, 1, content);
    }
    this.closeContentEditor();
    this.form.markAsDirty();
  }

  public onContentClose(): void {
    this.closeContentEditor();
  }

  public deleteContent(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete content?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.closeContentEditor();
          this.contents.value.splice(index, 1);
          this.form.markAsDirty();
        }
      });
  }

  public moveContentUp(index: number): void {
    if (index < 1) {
      return;
    }
    const content = this.contents.value[index];
    const contents = [...this.contents.value];
    contents.splice(index, 1);
    contents.splice(index - 1, 0, content);
    this.contents.setValue(contents);
    this.form.markAsDirty();
  }

  public moveContentDown(index: number): void {
    if (index + 1 >= this.contents.value.length) {
      return;
    }
    const content = this.contents.value[index];
    const contents = [...this.contents.value];
    contents.splice(index, 1);
    contents.splice(index + 1, 0, content);
    this.contents.setValue(contents);
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
