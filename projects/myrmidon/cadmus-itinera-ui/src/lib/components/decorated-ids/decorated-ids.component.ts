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
export class DecoratedIdsComponent implements OnInit {
  private _ids: DecoratedId[];
  private _editedIdIndex;

  public editedId: DecoratedId;
  public form: FormGroup;
  public id: FormControl;
  public rank: FormControl;
  public tag: FormControl;
  public references$: BehaviorSubject<DocReference[]>;
  public tabIndex: number;

  @Input()
  public get ids(): DecoratedId[] {
    return this._ids;
  }
  public set ids(value: DecoratedId[]) {
    this._ids = value || [];
    this.setEditedId(null);
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
    this.references$ = new BehaviorSubject<DocReference[]>([]);
    this.tabIndex = 0;
    this._editedIdIndex = -1;

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

  ngOnInit(): void {}

  private setEditedId(id: DecoratedId): void {
    if (!id) {
      this.form?.reset();
    } else {
      this.id.setValue(id.id);
      this.rank.setValue(id.rank);
      this.tag.setValue(id.tag);
      this.references$.next(id.sources || []);
      this.form.markAsPristine();
    }
    this.editedId = id;
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
    this._editedIdIndex = -1;
    this.setEditedId({
      id: null,
      tag: null,
      rank: 0,
      sources: null,
    });
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public editId(index: number): void {
    this._editedIdIndex = index;
    this.setEditedId(this.ids[index]);
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public deleteId(index: number): void {
    if (this._editedIdIndex === index) {
      this.closeEditedId();
    }
    this.ids = [...this.ids.slice(index, 1)];
  }

  public onReferencesChange(references: DocReference[]): void {
    this.editedId.sources = references?.length ? references : null;
  }

  public closeEditedId(): void {
    this._editedIdIndex = -1;
    this.setEditedId(null);
    this.tabIndex = 0;
  }

  public saveEditedId(): void {
    if (this.form.invalid) {
      return;
    }
    const id = this.getEditedId();

    if (this._editedIdIndex === -1) {
      this.ids = [...this.ids, id];
    } else {
      this.ids = [
        ...this.ids.slice(0, this._editedIdIndex),
        id,
        ...this.ids.slice(this._editedIdIndex + 1),
      ];
    }
    this.closeEditedId();
  }

  public close(): void {
    this.editorClose.emit();
  }

  public save(): void {
    // if editing and valid, save; else move to editor
    if (this.editedId) {
      if (this.form.invalid) {
        this.tabIndex = 1;
        return;
      }
      this.saveEditedId();
    }
    this.idsChange.emit(this.ids);
  }
}
