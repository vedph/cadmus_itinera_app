import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry, DocReference } from '@myrmidon/cadmus-core';
import { DecoratedId } from '@myrmidon/cadmus-itinera-core';

/**
 * Decorated IDs editor.
 */
@Component({
  selector: 'itinera-decorated-ids',
  templateUrl: './decorated-ids.component.html',
  styleUrls: ['./decorated-ids.component.css'],
})
export class DecoratedIdsComponent {
  private _ids: DecoratedId[];

  public editedIndex: number;
  public editedId: DecoratedId;
  public editorOpen: boolean;

  public subForm: FormGroup;
  public id: FormControl;
  public rank: FormControl;
  public tag: FormControl;
  public sources: FormControl;
  public form: FormGroup;

  public initialSources: DocReference[];

  @Input()
  public get ids(): DecoratedId[] {
    return this._ids;
  }
  public set ids(value: DecoratedId[]) {
    this._ids = value || [];
    this.closeIdEditor();
  }

  @Input()
  public tagEntries: ThesaurusEntry[] | undefined;
  @Input()
  public docRefTagEntries: ThesaurusEntry[] | undefined;

  @Output()
  public idsChange: EventEmitter<DecoratedId[]>;

  @Output()
  public editorClose: EventEmitter<any>;

  constructor(formBuilder: FormBuilder) {
    this.idsChange = new EventEmitter<DecoratedId[]>();
    this.editorClose = new EventEmitter<any>();
    this.initialSources = [];
    this.editedIndex = -1;
    this.editorOpen = false;

    this.ids = [];
    this.id = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.rank = formBuilder.control(0);
    this.tag = formBuilder.control(null, Validators.maxLength(50));
    this.sources = formBuilder.control([]);
    this.subForm = formBuilder.group({
      id: this.id,
      rank: this.rank,
      tag: this.tag,
      sources: this.sources,
    });
    this.form = formBuilder.group({
      subForm: this.subForm,
    });
  }

  private closeIdEditor(): void {
    this.editedId = undefined;
    this.initialSources = [];
    this.subForm?.reset();
    this.subForm?.disable();
    this.editorOpen = false;
  }

  public editId(index: number): void {
    this.editedIndex = index;
    this.subForm.enable();
    this.editedId = this.ids[index];
    this.initialSources = this.editedId.sources || [];
    this.id.setValue(this.editedId.id);
    this.rank.setValue(this.editedId.rank);
    this.tag.setValue(this.editedId.tag);
    this.subForm.markAsPristine();
    this.editorOpen = true;
  }

  private getEditedId(): DecoratedId {
    if (!this.editedId) {
      return null;
    }
    return {
      id: this.id.value?.trim(),
      rank: this.rank.value || 0,
      tag: this.tag.value?.trim(),
      sources: this.sources.value?.length ? this.sources.value : undefined,
    };
  }

  public editNewId(): void {
    this.ids.push({
      id: null,
    });
    this.editId(this.ids.length - 1);
  }

  public deleteId(index: number): void {
    if (this.editedIndex === index) {
      this.closeEditedId();
    }
    const newIds = [...this.ids];
    newIds.splice(index, 1);
    this.ids = newIds;
  }

  public onSourcesChange(sources: DocReference[]): void {
    this.sources.setValue(sources);
    this.subForm.markAsDirty();
  }

  public closeEditedId(): void {
    this.closeIdEditor();
  }

  public saveEditedId(): void {
    if (this.subForm.invalid) {
      return;
    }
    const id = this.getEditedId();

    this.ids = [
      ...this.ids.slice(0, this.editedIndex),
      id,
      ...this.ids.slice(this.editedIndex + 1),
    ];
    this.closeEditedId();
  }

  public close(): void {
    this.editorClose.emit();
  }

  public save(): void {
    // if editing and valid, save; else show editor
    if (this.editedId) {
      if (this.subForm.invalid) {
        this.editorOpen = true;
        return;
      }
      this.saveEditedId();
    }
    this.idsChange.emit(this.ids);
  }
}
