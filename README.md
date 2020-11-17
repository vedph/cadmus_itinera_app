# Cadmus Itinera App

Quick Docker image build:

1. `npm run build-all`
2. `ng build --prod`
3. `docker build . -t vedph2020/cadmus-itinera-app:1.0.10 -t vedph2020/cadmus-itinera-app:latest` (replace with the current version).

Web application frontend for Cadmus _Itinera_. This application is built by packing together a number of components:

- _frontend_: the app includes the application and its specific libraries; shared Cadmus libraries (as defined in [Cadmus shell](https://github.com/vedph/cadmus_shell)) are used from NPM.

- _backend_: the corresponding backend API is [Cadmus Itinera API](https://github.com/vedph/cadmus_itinera_api), depending on [Cadmus Itinera](https://github.com/vedph/cadmus_itinera) for its specific parts.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

## Developer Environment

Quick link to the [procedure for adding new parts](https://github.com/vedph/cadmus_doc/blob/master/web/adding-parts.md).

Cadmus shell libraries are now public in NPM, so this project just links to them. When updating them:

- increase the version numbers in the app's `package.json`;
- increase the version numbers in the `peerDependencies` of each library using them (this is good practice, to be able to publish these libraries too, should they be reused in other projects).

### NPM Link

Before Cadmus shell libraries were published to NPM, we used `npm link` to link them to this project. This implies that you should clone the [cadmus-shell](https://github.com/vedph/cadmus_shell) repository, build all the libraries there with `npm run build-all`, and then enter the `dist/LIBNAME` of each library there and type `npm link`. This creates the symbolic links to these libraries, which can then referenced from other projects.

To reference these libraries, once you have NPM link-ed them, just run the `link.bat` batch in this folder.

In Windows, you can find the symbolic links in a folder like `C:\Users\USERNAME\AppData\Roaming\npm\node_modules`.

Once you have published your library to NPM, just `npm unlink LIBNAME` from the client project's folder (this is equivalent to a `npm uninstall`), and then reinstall (from NPM).

Other general tasks:

- list all the linked libraries: `npm ls -g --depth=0 --link=true`.
- unlink: `npm unlink LIBNAME -g` (linked libraries are global).

## Thesauri List

This list is built by inspecting the head comments of each part editor component in the libraries.

- AttachmentsPart:
  - epist-attachment-types
- ChronotopicsPart:
  - doc-reference-tags
- CitedPersonsPart:
  - doc-reference-tags
  - languages
  - person-name-types
  - person-id-tags
- CorrDedicationsPart:
  - doc-reference-tags
- CorrExchangesPart:
  - doc-reference-tags
  - epist-attachment-types
- CorrPseudonymsPart:
  - languages
  - doc-reference-tags
- DocReferencesPart:
  - doc-reference-tags
- LetterInfoPart:
  - languages
  - doc-reference-tags
- PersonEventsPart:
  - bio-event-types
  - event-participant-tags
- PersonHandPart:
  - ms-hand-types
  - ms-hand-jobs
  - ms-hand-sign-types
- PersonPart:
  - languages
  - person-name-types
  - person-name-tags
- PoeticTextInfoPart:
  - languages
  - person-name-types
  - person-name-tags
  - person-id-tags
  - text-metres
  - doc-reference-tags

- MsBindingPart:
  - ms-binding-materials
  - ms-binding-support-materials
  - physical-size-tags
  - physical-dimension-tags
  - physical-size-units\*
- MsCatchwordsPart:
  - ms-catchword-positions
- MsCompositionPart:
  - ms-materials
- MsContentLociPart
- MsContentsPart:
  - ms-content-states
- MsDecorationsPart:
  - ms-decoration-types
  - ms-decoration-layouts
  - ms-decoration-tools
  - ms-decoration-positions
  - ms-guide-positions
  - ms-artist-types
  - ms-decoration-colors
  - physical-size-tags
  - physical-dimension-tags
  - physical-size-units\*
- MsDimensionsPart:
  - ms-dimensions
  - ms-counts
  - physical-size-units\*
- MsHandsPart:
  - ms-hand-id-reasons
  - ms-rubrication-types
  - languages
- MsHistoryPart:
  - ms-provenance-areas
  - ms-history-person-roles
  - ms-history-languages
  - ms-annotation-types
  - ms-restoration-types
  - person-name-types
  - person-name-tags
- MsMaterialDscPart:
  - ms-materials
  - ms-formats
  - ms-states
- MsNumberingsPart:
  - ms-numbering-eras
  - ms-numbering-systems
  - ms-numbering-techniques
  - ms-numbering-positions
- MsPlacePart:
  - ms-place-areas
  - doc-reference-tags
- MsPoemRangesPart:
  - ms-poem-ranges-tags
- MsQuiresPart
- MsSignaturesPart:
  - ms-signature-tags
- MsWatermarksPart:
  - ms-watermark-subjects

Reverse index:

- bio-event-types
- doc-reference-tags
- epist-attachment-types
- event-participant-tags
- languages
- ms-annotation-types
- ms-artist-types
- ms-binding-materials
- ms-binding-support-materials
- ms-catchword-positions
- ms-content-states
- ms-counts
- ms-decoration-colors
- ms-decoration-layouts
- ms-decoration-positions
- ms-decoration-tools
- ms-decoration-types
- ms-dimensions
- ms-formats
- ms-guide-positions
- ms-hand-id-reasons
- ms-hand-jobs
- ms-hand-sign-types
- ms-hand-types
- ms-history-languages
- ms-history-person-roles
- ms-materials
- ms-numbering-eras
- ms-numbering-positions
- ms-numbering-systems
- ms-numbering-techniques
- ms-place-areas
- ms-poem-ranges-tags
- ms-provenance-areas
- ms-restoration-types
- ms-rubrication-types
- ms-signature-tags
- ms-states
- ms-watermark-subjects
- person-name-tags
- person-name-types
- physical-dimension-tags
- physical-size-tags
- physical-size-units\*

## Useful Snippets

These snippets are provided here just to save some typing.

### Text

Standard text field with required and max-length:

```html
<!-- input -->
<mat-form-field>
  <input matInput [formControl]="__NAME__" placeholder="__NAME__" />
  <mat-error
    *ngIf="
      __NAME__.errors?.required && (__NAME__.dirty || __NAME__.touched)
    "
    >__NAME__ required</mat-error
  >
  <mat-error
    *ngIf="
      __NAME__.errors?.maxLength && (__NAME__.dirty || __NAME__.touched)
    "
    >__NAME__ too long</mat-error
  >
</mat-form-field>
```

In a form array template, where we must bind by name (`item` being the variable used in the `*ngFor`):

```html
<!-- input in FormArray -->
<mat-form-field>
  <input matInput formControlName="__NAME__" placeholder="__NAME__" />
  <mat-error
    *ngIf="
      item['controls'].__NAME__.errors?.required &&
      (item['controls'].__NAME__.dirty ||
        item['controls'].__NAME__.touched)
    "
    >__NAME__ required</mat-error
  >
  <mat-error
    *ngIf="
      item['controls'].__NAME__.errors?.maxLength &&
      (item['controls'].__NAME__.dirty ||
        item['controls'].__NAME__.touched)
    "
    >__NAME__ too long</mat-error
  >
</mat-form-field>
```

### Select

Standard selection:

```html
<!-- select -->
<mat-form-field *ngIf="__ARRAY__?.length" style="width: 8em">
  <mat-select [formControl]="__NAME__" placeholder="__NAME__">
    <mat-option *ngFor="let e of __ARRAY__" [value]="e.id"
      >{{ e.value }}</mat-option
    >
  </mat-select>
  <mat-error
    *ngIf="__NAME__.errors?.required && (__NAME__.dirty || __NAME__.touched)"
    >__NAME__ required</mat-error
  >
</mat-form-field>
```

In form array:

```html
<!-- select in FormArray -->
<mat-form-field *ngIf="__ARRAY__?.length" style="width: 8em">
  <mat-select formControlName="__NAME__" placeholder="__NAME__">
    <mat-option *ngFor="let e of __ARRAY__" [value]="e.id"
      >{{ e.value }}</mat-option
    >
  </mat-select>
  <mat-error
    *ngIf="
      item['controls'].__NAME__.errors?.required &&
      (item['controls'].__NAME__.dirty ||
        item['controls'].__NAME__.touched)
    "
    >__NAME__ required</mat-error
  >
</mat-form-field>
```

### Monaco Markdown

Add a normal `FormControl` and options:

```ts
public editorOptions = {
  theme: 'vs-light',
  language: 'markdown',
  wordWrap: 'on',
  // https://github.com/atularen/ngx-monaco-editor/issues/19
  automaticLayout: true,
};
```

```html
<div>
  <ngx-monaco-editor
    [options]="editorOptions"
    [formControl]="__NAME__"
  ></ngx-monaco-editor>
  <mat-error
    *ngIf="__NAME__.errors?.maxLength && (__NAME__.touched || __NAME__.dirty)"
    >__NAME__ too long</mat-error
  >
</div>
```

### Part with List of Editables in Child Component

The child component is in another tab and has ok/cancel buttons.

```ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';

import { __PARTNAME__Part, __PARTNAME___PART_TYPEID } from '../YOURPARTFILE';

/**
 * __PARTNAME__ editor component.
 * Thesauri: TODO thesauri names and optionality
 */
export class __PARTNAME__PartComponent
  extends ModelEditorComponentBase<__PARTNAME__Part>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public edited__NAME__: __NAME__;

  public subjectEntries: ThesaurusEntry[];

  public __NAME__s: __NAME__[];

  public count: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    this.__NAME__s = [];
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: __PARTNAME__Part): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.count.setValue(model.__NAME__s?.length || 0);
    this.__NAME__s = model.__NAME__s || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: __PARTNAME__Part): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    // const key = 'note-tags';
    // if (this.thesauri && this.thesauri[key]) {
    // this.tagEntries = this.thesauri[key].entries;
    // } else {
    //   this.tagEntries = null;
    // }
  }

  protected getModelFromForm(): __PARTNAME__Part {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: __PARTNAME___PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        __NAME__s: [],
      };
    }
    part.__NAME__s = this.__NAME__s;
    return part;
  }

  public add__NAME__(): void {
    const item: __NAME__ = {
      // TODO
    };
    this.__NAME__s = [...this.__NAME__s, item];
    this.count.setValue(this.__NAME__s.length);
    this.count.markAsDirty();
    this.edit__NAME__(this.__NAME__s.length - 1);
  }

  public edit__NAME__(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.edited__NAME__ = null;
    } else {
      this._editedIndex = index;
      this.edited__NAME__ = this.__NAME__s[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public on__NAME__Saved(item: __NAME__): void {
    this.__NAME__s = this.__NAME__s.map((s, i) =>
      i === this._editedIndex ? item : s
    );
    this.edit__NAME__(-1);
    this.count.markAsDirty();
  }

  public on__NAME__Closed(): void {
    this.edit__NAME__(-1);
  }

  public delete__NAME__(index: number): void {
    this._dialogService
      .confirm("Confirmation", "Delete __NAME__?")
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const items = [...this.__NAME__s];
          items.splice(index, 1);
          this.__NAME__s = items;
          this.count.setValue(this.__NAME__s.length);
          this.count.markAsDirty();
        }
      });
  }

  public move__NAME__Up(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.__NAME__s[index];
    const items = [...this.__NAME__s];
    items.splice(index, 1);
    items.splice(index - 1, 0, item);
    this.__NAME__s = items;
    this.form.markAsDirty();
  }

  public move__NAME__Down(index: number): void {
    if (index + 1 >= this.__NAME__s.length) {
      return;
    }
    const item = this.__NAME__s[index];
    const items = [...this.__NAME__s];
    items.splice(index, 1);
    items.splice(index + 1, 0, item);
    this.__NAME__s = items;
    this.form.markAsDirty();
  }
}
```

```html
<form [formGroup]="form" (submit)="save()">
  <mat-card>
    <mat-card-header>
      <div mat-card-avatar>
        <mat-icon>picture_in_picture</mat-icon>
      </div>
      <mat-card-title>__NAME__s Part</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <mat-tab-group [(selectedIndex)]="tabIndex">
        <mat-tab label="__NAME__s">
          <div>
            <button
              type="button"
              mat-icon-button
              color="primary"
              matTooltip="Add __NAME__"
              (click)="add__NAME__()"
            >
              <mat-icon>add_circle</mat-icon>
            </button>
          </div>
          <table *ngIf="__NAME__s?.length">
            <thead>
              <tr>
                <th></th>
                <th>TODO</th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="
                  let x of __NAME__s;
                  let i = index;
                  let first = first;
                  let last = last
                "
              >
                <td>
                  <button
                    type="button"
                    mat-icon-button
                    color="primary"
                    matTooltip="Edit this __NAME__"
                    (click)="edit__NAME__(i)"
                  >
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button
                    type="button"
                    mat-icon-button
                    matTooltip="Move this __NAME__ up"
                    [disabled]="first"
                    (click)="move__NAME__Up(i)"
                  >
                    <mat-icon>arrow_upward</mat-icon>
                  </button>
                  <button
                    type="button"
                    mat-icon-button
                    matTooltip="Move this __NAME__ down"
                    [disabled]="last"
                    (click)="move__NAME__Down(i)"
                  >
                    <mat-icon>arrow_downward</mat-icon>
                  </button>
                  <button
                    type="button"
                    mat-icon-button
                    color="warn"
                    matTooltip="Delete this __NAME__"
                    (click)="delete__NAME__(i)"
                  >
                    <mat-icon>remove_circle</mat-icon>
                  </button>
                </td>
                <td>{{ x.TODO }}</td>
              </tr>
            </tbody>
          </table>
        </mat-tab>

        <mat-tab label="__NAME__" *ngIf="edited__NAME__">
          <cadmus-ms-__NAME__
            [model]="edited__NAME__"
            [thesaurusEntries]="TODO"
            (modelChange)="on__NAME__Saved($event)"
            (editorClose)="on__NAME__Closed()"
          ></cadmus-ms-__NAME__>
        </mat-tab>
      </mat-tab-group>
    </mat-card-content>
    <mat-card-actions>
      <cadmus-close-save-buttons
        [form]="form"
        [noSave]="userLevel < 2"
        (closeRequest)="close()"
      ></cadmus-close-save-buttons>
    </mat-card-actions>
  </mat-card>
</form>
```

### Edit Model Component

```ts
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ThesaurusEntry } from "@myrmidon/cadmus-core";

@Component({
  selector: "cadmus-__FNAME__",
  templateUrl: "./__FNAME__.component.html",
  styleUrls: ["./__NAME__.component.css"],
})
export class __NAME__Component implements OnInit {
  @Input()
  public model: __NAME__;

  // TODO: eventual thesaurus entries, like:
  // @Input()
  // public subjectEntries: ThesaurusEntry[];

  @Output()
  public modelChange: EventEmitter<__NAME__>;

  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  // TODO form controls

  constructor(formBuilder: FormBuilder) {
    // events
    this.modelChange = new EventEmitter<__NAME__>();
    this.editorClose = new EventEmitter();
    // form
    // TODO controls
    this.form = formBuilder.group({
      // TODO
    });
  }

  ngOnInit(): void {
    this.updateForm(this.model);
  }

  private updateForm(model: __NAME__): void {
    if (!model) {
      this.form.reset();
      return;
    }
    // TODO set controls
    this.form.markAsPristine();
  }

  private getModel(): __NAME__ {
    return {
      // TODO set properties from controls
    };
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.modelChange.emit(this.getModel());
  }
}
```

```html
<form [formGroup]="form" (submit)="save()">
  TODO

  <!-- buttons -->
  <div>
    <button
      type="button"
      color="warn"
      mat-icon-button
      matTooltip="Discard __LABEL__ changes"
      (click)="cancel()"
    >
      <mat-icon>clear</mat-icon>
    </button>
    <button
      type="submit"
      color="primary"
      mat-icon-button
      matTooltip="Accept __LABEL__ changes"
      [disabled]="form.invalid || form.pristine"
    >
      <mat-icon>check_circle</mat-icon>
    </button>
  </div>
</form>
```
