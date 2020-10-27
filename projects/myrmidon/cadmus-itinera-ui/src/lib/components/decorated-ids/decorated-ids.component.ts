import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { DecoratedId, DocReference } from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

/**
 * Decorated IDs editor.
 */
@Component({
  selector: 'cadmus-decorated-ids',
  templateUrl: './decorated-ids.component.html',
  styleUrls: ['./decorated-ids.component.css'],
})
export class DecoratedIdsComponent {
  private _ids: DecoratedId[];

  public editedIndex: number;
  public editedId: DecoratedId;
  public editorOpen: boolean;

  public form: FormGroup;
  public id: FormControl;
  public rank: FormControl;
  public tag: FormControl;
  public sources$: BehaviorSubject<DocReference[]>;

  @Input()
  public get ids(): DecoratedId[] {
    return this._ids;
  }
  public set ids(value: DecoratedId[]) {
    this._ids = value || [];
    this.editId(-1);
  }

  @Input()
  public tagEntries: ThesaurusEntry[];

  @Output()
  public idsChange: EventEmitter<DecoratedId[]>;

  @Output()
  public editorClose: EventEmitter<any>;

  constructor(formBuilder: FormBuilder) {
    this.idsChange = new EventEmitter<DecoratedId[]>();
    this.editorClose = new EventEmitter<any>();
    this.sources$ = new BehaviorSubject<DocReference[]>([]);
    this.editedIndex = -1;
    this.editorOpen = false;

    this.ids = [];
    this.id = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.rank = formBuilder.control(0);
    this.tag = formBuilder.control(null, Validators.maxLength(50));
    this.form = formBuilder.group({
      id: this.id,
      rank: this.rank,
      tag: this.tag,
    });
  }

  public editId(index: number): void {
    this.editedIndex = index;

    if (index === -1) {
      this.editedId = null;
      this.sources$.next([]);
      this.form?.reset();
      this.form?.disable();
      this.editorOpen = false;
    } else {
      this.form.enable();
      this.editedId = this.ids[index];
      this.sources$.next(this.editedId.sources || []);
      this.id.setValue(this.editedId.id);
      this.rank.setValue(this.editedId.rank);
      this.tag.setValue(this.editedId.tag);
      this.form.markAsPristine();
      this.editorOpen = true;
    }
  }

  private getEditedId(): DecoratedId {
    if (!this.editedId) {
      return null;
    }
    return {
      id: this.id.value?.trim(),
      rank: this.rank.value || 0,
      tag: this.tag.value?.trim(),
      sources: this.editedId.sources?.length ? this.editedId.sources : null,
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
    if (!this.editedId) {
      return;
    }
    this.editedId.sources = sources?.length ? sources : null;
    this.form.markAsDirty();
  }

  public closeEditedId(): void {
    this.editId(-1);
  }

  public saveEditedId(): void {
    if (this.form.invalid) {
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
      if (this.form.invalid) {
        this.editorOpen = true;
        return;
      }
      this.saveEditedId();
    }
    this.idsChange.emit(this.ids);
  }
}
