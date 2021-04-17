import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { DecoratedCount } from '@myrmidon/cadmus-itinera-core';
import { InplaceEditorComponentBase } from '@myrmidon/cadmus-ui';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * Decorated counts in-place editor.
 */
@Component({
  selector: 'itinera-decorated-counts',
  templateUrl: './decorated-counts.component.html',
  styleUrls: ['./decorated-counts.component.css'],
})
export class DecoratedCountsComponent
  extends InplaceEditorComponentBase<DecoratedCount[]>
  implements OnInit, AfterViewInit, OnDestroy {
  private _idSubscription: Subscription;

  @ViewChildren('id') idQueryList: QueryList<any>;

  @Input()
  public idEntries: ThesaurusEntry[] | undefined;

  public counts: FormArray;

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  public ngOnInit(): void {
    this.counts = this.formBuilder.array([]);

    this.initEditor('decoratedCounts', {
      counts: this.counts,
    });
  }

  public ngAfterViewInit(): void {
    this._idSubscription = this.idQueryList.changes
      .pipe(debounceTime(300))
      .subscribe((_) => {
        if (this.idQueryList.length > 0) {
          this.idQueryList.last.nativeElement.focus();
        }
      });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this._idSubscription.unsubscribe();
  }

  private getCountGroup(count?: DecoratedCount): FormGroup {
    return this.formBuilder.group({
      id: this.formBuilder.control(count?.id, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      value: this.formBuilder.control(count?.value, [
        Validators.required,
        Validators.min(0),
      ]),
      note: this.formBuilder.control(count?.note, [
        Validators.maxLength(300)
      ])
    });
  }

  public addCount(count?: DecoratedCount): void {
    this.counts.push(this.getCountGroup(count));
  }

  public removeCount(index: number): void {
    this.counts.removeAt(index);
  }

  public moveCountUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.counts.controls[index];
    this.counts.removeAt(index);
    this.counts.insert(index - 1, item);
  }

  public moveCountDown(index: number): void {
    if (index + 1 >= this.counts.length) {
      return;
    }
    const item = this.counts.controls[index];
    this.counts.removeAt(index);
    this.counts.insert(index + 1, item);
  }

  protected setModel(model: DecoratedCount[]): void {
    if (!this.counts) {
      return;
    }
    if (!model) {
      this.form.reset();
    } else {
      this.counts.clear();
      for (const c of model) {
        this.addCount(c);
      }
      this.form.markAsPristine();
    }
  }

  protected getModel(): DecoratedCount[] {
    const counts: DecoratedCount[] = [];

    for (let i = 0; i < this.counts.length; i++) {
      const g = this.counts.controls[i] as FormGroup;
      counts.push({
        id: g.controls.id.value?.trim(),
        value: g.controls.value.value || 0,
        note: g.controls.note.value?.trim()
      });
    }

    return counts;
  }
}
