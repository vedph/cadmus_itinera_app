import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { DecoratedCount } from '@myrmidon/cadmus-itinera-core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * Decorated counts real-time editor.
 * Bind counts to an initialCounts property, and handle countsChange
 * for counts.setValue.
 */
@Component({
  selector: 'itinera-decorated-counts',
  templateUrl: './decorated-counts.component.html',
  styleUrls: ['./decorated-counts.component.css'],
})
export class DecoratedCountsComponent implements OnInit, AfterViewInit, OnDestroy {
  private _counts: DecoratedCount[];
  private _updatingForm: boolean;
  private _cntSubs: Subscription[];
  private _idSubscription: Subscription;

  @ViewChildren('id') idQueryList: QueryList<any>;

  /**
   * The counts.
   */
  @Input()
  public get counts(): DecoratedCount[] {
    return this._counts;
  }
  public set counts(value: DecoratedCount[]) {
    this._counts = value || [];
    this.updateForm(this._counts);
  }

  @Input()
  public idEntries: ThesaurusEntry[] | undefined;

  /**
   * Emitted whenever any count changes.
   */
  @Output()
  public countsChange: EventEmitter<DecoratedCount[]>;

  public countsArr: FormArray;
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this._cntSubs = [];
    this._counts = [];
    this.countsChange = new EventEmitter<DecoratedCount[]>();
    // form
    this.countsArr = _formBuilder.array([]);
    this.form = _formBuilder.group({
      countsArr: this.countsArr,
    });
  }

  public ngOnInit(): void {
    if (this._counts) {
      this.updateForm(this._counts);
    }
  }

  public ngAfterViewInit(): void {
    // focus on newly added count
    this._idSubscription = this.idQueryList.changes
      .pipe(debounceTime(300))
      .subscribe((lst: QueryList<any>) => {
        if (!this._updatingForm && lst.length > 0) {
          lst.last.nativeElement.focus();
        }
      });
  }

  private unsubscribeCounts(): void {
    for (let i = 0; i < this._cntSubs.length; i++) {
      this._cntSubs[i].unsubscribe();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribeCounts();
    this._idSubscription.unsubscribe();
  }

  //#region Counts
  private getCountGroup(count?: DecoratedCount): FormGroup {
    return this._formBuilder.group({
      id: this._formBuilder.control(count?.id, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      value: this._formBuilder.control(count?.value, [
        Validators.required,
        Validators.min(0),
      ]),
      note: this._formBuilder.control(count?.note, [Validators.maxLength(300)]),
    });
  }

  public addCount(count?: DecoratedCount): void {
    const g = this.getCountGroup(count);
    this._cntSubs.push(
      g.valueChanges.pipe(debounceTime(300)).subscribe((_) => {
        this.emitCountsChange();
      })
    );
    this.countsArr.push(g);

    if (!this._updatingForm) {
      this.emitCountsChange();
    }
  }

  public removeCount(index: number): void {
    this._cntSubs[index].unsubscribe();
    this._cntSubs.splice(index, 1);
    this.countsArr.removeAt(index);
    this.emitCountsChange();
  }

  private swapArrElems(a: any[], i: number, j: number): void {
    if (i === j) {
      return;
    }
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }

  public moveCountUp(index: number): void {
    if (index < 1) {
      return;
    }
    const ctl = this.countsArr.controls[index];
    this.countsArr.removeAt(index);
    this.countsArr.insert(index - 1, ctl);

    this.swapArrElems(this._cntSubs, index, index - 1);

    this.emitCountsChange();
  }

  public moveCountDown(index: number): void {
    if (index + 1 >= this.countsArr.length) {
      return;
    }
    const ctl = this.countsArr.controls[index];
    this.countsArr.removeAt(index);
    this.countsArr.insert(index + 1, ctl);

    this.swapArrElems(this._cntSubs, index, index + 1);

    this.emitCountsChange();
  }

  public clearCounts(): void {
    this.countsArr.clear();
    this.unsubscribeCounts();
    this._cntSubs = [];
    if (!this._updatingForm) {
      this.emitCountsChange();
    }
  }
  //#endregion

  private updateForm(counts: DecoratedCount[]): void {
    if (!this.countsArr) {
      return;
    }
    this._updatingForm = true;
    this.clearCounts();

    if (!counts) {
      this.form.reset();
    } else {
      for (const c of counts) {
        this.addCount(c);
      }
      this.form.markAsPristine();
    }
    this._updatingForm = false;
  }

  private getCounts(): DecoratedCount[] {
    const counts: DecoratedCount[] = [];

    for (let i = 0; i < this.countsArr.length; i++) {
      const g = this.countsArr.controls[i] as FormGroup;
      counts.push({
        id: g.controls.id.value?.trim(),
        value: g.controls.value.value || 0,
        note: g.controls.note.value?.trim(),
      });
    }

    return counts;
  }

  public emitCountsChange(): void {
    this.countsChange.emit(this.getCounts());
  }
}
