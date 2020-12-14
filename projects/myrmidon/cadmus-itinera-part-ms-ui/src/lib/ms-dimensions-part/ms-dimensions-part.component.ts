import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
} from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  MsDimensionsPart,
  MSDIMENSIONS_PART_TYPEID,
} from '../ms-dimensions-part';
import {
  DecoratedCount,
  MsLocationService,
  PhysicalDimension,
} from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

/**
 * Manuscript's dimensions part.
 * Thesauri: physical-size-units; optional: ms-dimensions, ms-counts.
 */
@Component({
  selector: 'itinera-ms-dimensions-part',
  templateUrl: './ms-dimensions-part.component.html',
  styleUrls: ['./ms-dimensions-part.component.css'],
})
export class MsDimensionsPartComponent
  extends ModelEditorComponentBase<MsDimensionsPart>
  implements OnInit {
  private _counts: DecoratedCount[];

  public sample: FormControl;
  // here we use PhysicalDimension by making its tag required,
  // and we display it as "id", as it effectively serves as
  // the ID of the object being measured. The model stays the same,
  // as the dimension's tag is already provided as a way of
  // grouping dimensions; e.g. a partial dimension because the
  // object is incomplete. Should further grouping be required,
  // we would just use different ID values (e.g. "width-partial"
  // vs. "width").
  public dimensions: FormArray;
  // total count of dimensions + counts, used for validating the
  // form (using a custom form validator would not suffice,
  // as the counts are not included in this form)
  public total: FormControl;

  public counts$: BehaviorSubject<DecoratedCount[]>;

  public unitEntries: ThesaurusEntry[];
  public dimEntries: ThesaurusEntry[];
  public countEntries: ThesaurusEntry[];

  constructor(
    authService: AuthService,
    private _formBuilder: FormBuilder,
    private _msLocationService: MsLocationService
  ) {
    super(authService);
    this._counts = [];
    this.counts$ = new BehaviorSubject<DecoratedCount[]>([]);
    // form
    this.sample = _formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.dimensions = _formBuilder.array([]);
    this.total = _formBuilder.control(0, Validators.min(1));
    this.form = _formBuilder.group({
      sample: this.sample,
      dimensions: this.dimensions,
      count: this.total,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsDimensionsPart): void {
    if (!model) {
      this.form.reset();
      this.counts$.next([]);
      return;
    }
    // sample
    this.sample.setValue(
      this._msLocationService.locationToString(model.sample)
    );

    // dimensions
    this.dimensions.clear();
    for (let i = 0; i < model.dimensions?.length || 0; i++) {
      this.addDimension(model.dimensions[i]);
    }

    // counts
    this.counts$.next(model.counts || []);

    this.total.setValue(this.dimensions.length + this.counts$.value.length);
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsDimensionsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'physical-size-units';
    if (this.thesauri && this.thesauri[key]) {
      this.unitEntries = this.thesauri[key].entries;
    } else {
      this.unitEntries = null;
    }

    key = 'ms-dimensions';
    if (this.thesauri && this.thesauri[key]) {
      this.dimEntries = this.thesauri[key].entries;
    } else {
      this.dimEntries = null;
    }

    key = 'ms-counts';
    if (this.thesauri && this.thesauri[key]) {
      this.countEntries = this.thesauri[key].entries;
    } else {
      this.countEntries = null;
    }
  }

  protected getModelFromForm(): MsDimensionsPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSDIMENSIONS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        sample: null,
      };
    }
    // sample
    part.sample = this._msLocationService.parseLocation(this.sample.value);

    // dimensions
    for (let i = 0; i < this.dimensions.length; i++) {
      const g = this.dimensions.controls[i] as FormGroup;
      part.dimensions.push({
        value: g.controls.value.value,
        unit: g.controls.unit.value?.trim(),
        tag: g.controls.tag.value?.trim(),
      });
    }

    // counts
    part.counts = this._counts?.length ? this._counts : null;

    return part;
  }

  private getDimensionGroup(dimension?: PhysicalDimension): FormGroup {
    return this._formBuilder.group({
      tag: this._formBuilder.control(dimension?.tag, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      value: this._formBuilder.control(
        dimension?.value || 0,
        Validators.required
      ),
      unit: this._formBuilder.control(dimension?.unit, [
        Validators.required,
        Validators.maxLength(20),
      ]),
    });
  }

  private updateTotal(): void {
    this.total.setValue(this.dimensions.length + this._counts.length);
    this.total.markAsDirty();
  }

  public addDimension(dimension?: PhysicalDimension): void {
    this.dimensions.push(this.getDimensionGroup(dimension));
    this.updateTotal();
  }

  public removeDimension(index: number): void {
    this.dimensions.removeAt(index);
    this.updateTotal();
  }

  public moveDimensionUp(index: number): void {
    if (index < 1) {
      return;
    }
    const dimension = this.dimensions.controls[index];
    this.dimensions.removeAt(index);
    this.dimensions.insert(index - 1, dimension);
  }

  public moveDimensionDown(index: number): void {
    if (index + 1 >= this.dimensions.length) {
      return;
    }
    const dimension = this.dimensions.controls[index];
    this.dimensions.removeAt(index);
    this.dimensions.insert(index + 1, dimension);
  }

  public onCountsChanged(counts: DecoratedCount[]): void {
    this._counts = counts || [];
    this.updateTotal();
  }
}
