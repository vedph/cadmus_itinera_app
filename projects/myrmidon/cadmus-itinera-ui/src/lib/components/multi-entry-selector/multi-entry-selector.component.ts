import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface SelectableEntry {
  id: string;
  name: string;
}

/**
 * A multiple entries selector. This gets a data object with the list
 * of all the entries available for selection, each with an ID and a name;
 * and a list of selected entry IDs. It then shows a list of checkboxes,
 * one for each entry, and allows users to check/uncheck them. Whenever
 * selection is changed, the selectionChange event is fired.
 */
@Component({
  selector: 'itinera-multi-entry-selector',
  templateUrl: './multi-entry-selector.component.html',
  styleUrls: ['./multi-entry-selector.component.css'],
})
export class MultiEntrySelectorComponent implements OnInit, OnDestroy {
  private _ids: string[] | undefined;
  private _entries: SelectableEntry[] | undefined;
  private _data$: BehaviorSubject<{
    selectedIds: string[];
    entries: SelectableEntry[];
  }>;
  private _subs: Subscription[];
  private _changeFrozen: boolean;

  @Input()
  public get selectedIds(): string[] | undefined {
    return this._ids;
  }
  public set selectedIds(value: string[] | undefined) {
    this._ids = value;
    this._data$.next({
      selectedIds: value,
      entries: this._entries,
    });
  }

  @Input()
  public get entries(): SelectableEntry[] | undefined {
    return this._entries;
  }
  public set entries(value: SelectableEntry[] | undefined) {
    this._entries = value;
    this._data$.next({
      selectedIds: this._ids,
      entries: value,
    });
  }

  @Input()
  public numbering = false;

  @Input()
  public toolbar = true;

  @Output()
  public selectionChange: EventEmitter<string[]>;

  public entriesArr: FormArray;
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.selectionChange = new EventEmitter<string[]>();
    this._subs = [];
    // form
    this.entriesArr = _formBuilder.array([]);
    this.form = _formBuilder.group({
      entries: this.entries,
    });
  }

  ngOnInit(): void {
    this._data$.subscribe(_ => {
      this.updateForm();
    });
  }

  ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }

  private getEntryGroup(selected: boolean): FormGroup {
    const g = this._formBuilder.group({
      entry: this._formBuilder.control(selected),
    });
    this._subs.push(
      g.valueChanges
        .pipe(distinctUntilChanged(), debounceTime(200))
        .subscribe((_) => {
          if (!this._changeFrozen) {
            this.selectionChange.emit(this.getSelectedIds());
          }
        })
    );
    return g;
  }

  private updateForm(): void {
    this.entriesArr.clear();
    if (this._entries?.length) {
      this._entries.forEach((entry) => {
        this.entriesArr.controls.push(
          this.getEntryGroup(this._ids.includes(entry.id))
        );
      });
    }
  }

  private getSelectedIds(): string[] {
    const selectedIds: string[] = [];
    for (let i = 0; i < this.entriesArr.controls.length; i++) {
      const g = this.entriesArr.at(i) as FormGroup;
      if (g.controls.entry.value) {
        selectedIds.push(this._entries[i].id);
      }
    }
    return selectedIds;
  }

  public toggleAll(): void {
    this._changeFrozen = true;
    for (let i = 0; i < this.entriesArr.controls.length; i++) {
      const g = this.entriesArr.at(i) as FormGroup;
      g.controls.entry.setValue(!g.controls.entry.value);
    }
    this._changeFrozen = false;
    this.selectionChange.emit(this.getSelectedIds());
  }

  public deselectAll(): void {
    this._changeFrozen = true;
    for (let i = 0; i < this.entriesArr.controls.length; i++) {
      const g = this.entriesArr.at(i) as FormGroup;
      g.controls.entry.setValue(false);
    }
    this._changeFrozen = false;
    this.selectionChange.emit(this.getSelectedIds());
  }

  public selectAll(): void {
    this._changeFrozen = true;
    for (let i = 0; i < this.entriesArr.controls.length; i++) {
      const g = this.entriesArr.at(i) as FormGroup;
      g.controls.entry.setValue(true);
    }
    this._changeFrozen = false;
    this.selectionChange.emit(this.getSelectedIds());
  }
}
