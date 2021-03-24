import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface SelectableEntry {
  id: string;
  name: string;
}

export interface MultiEntrySelectorData {
  selectedIds: string[];
  entries: SelectableEntry[];
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
  private _data: MultiEntrySelectorData | undefined;
  private _subs: Subscription[];
  private _changeFrozen: boolean;

  @Input()
  public get data(): MultiEntrySelectorData | undefined {
    return this._data;
  }
  public set data(value: MultiEntrySelectorData | undefined) {
    this._data = value;
    this.updateForm();
  }

  @Input()
  public numbering = false;

  @Input()
  public toolbar = true;

  @Output()
  public selectionChange: EventEmitter<string[]>;

  public entries: FormArray;
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.selectionChange = new EventEmitter<string[]>();
    this._subs = [];
    // form
    this.entries = _formBuilder.array([]);
    this.form = _formBuilder.group({
      entries: this.entries,
    });
  }

  ngOnInit(): void {}

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
    this.entries.clear();
    if (this._data?.entries?.length) {
      this._data.entries.forEach((entry) => {
        this.entries.controls.push(
          this.getEntryGroup(this._data.selectedIds.includes(entry.id))
        );
      });
    }
  }

  private getSelectedIds(): string[] {
    const selectedIds: string[] = [];
    for (let i = 0; i < this.entries.controls.length; i++) {
      const g = this.entries.at(i) as FormGroup;
      if (g.controls.entry.value) {
        selectedIds.push(this._data.entries[i].id);
      }
    }
    return selectedIds;
  }

  public toggleAll(): void {
    this._changeFrozen = true;
    for (let i = 0; i < this.entries.controls.length; i++) {
      const g = this.entries.at(i) as FormGroup;
      g.controls.entry.setValue(!g.controls.entry.value);
    }
    this._changeFrozen = false;
    this.selectionChange.emit(this.getSelectedIds());
  }

  public deselectAll(): void {
    this._changeFrozen = true;
    for (let i = 0; i < this.entries.controls.length; i++) {
      const g = this.entries.at(i) as FormGroup;
      g.controls.entry.setValue(false);
    }
    this._changeFrozen = false;
    this.selectionChange.emit(this.getSelectedIds());
  }

  public selectAll(): void {
    this._changeFrozen = true;
    for (let i = 0; i < this.entries.controls.length; i++) {
      const g = this.entries.at(i) as FormGroup;
      g.controls.entry.setValue(true);
    }
    this._changeFrozen = false;
    this.selectionChange.emit(this.getSelectedIds());
  }
}
