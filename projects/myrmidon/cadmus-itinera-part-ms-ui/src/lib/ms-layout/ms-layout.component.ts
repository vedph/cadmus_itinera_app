import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  PhysicalDimension,
  ThesaurusEntry,
} from '@myrmidon/cadmus-core';
import {
  DecoratedCount,
  MsLocationService,
} from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';
import { MsLayout } from '../ms-layouts-part';

@Component({
  selector: 'itinera-ms-layout',
  templateUrl: './ms-layout.component.html',
  styleUrls: ['./ms-layout.component.css'],
})
export class MsLayoutComponent implements OnInit {
  private _model: MsLayout | undefined;
  private _counts: DecoratedCount[];

  @Input()
  public get model(): MsLayout | undefined {
    return this._model;
  }
  public set model(value: MsLayout | undefined) {
    this._model = value;
    this.updateForm(value);
  }

  @Input()
  public unitEntries: ThesaurusEntry[];
  @Input()
  public dimEntries: ThesaurusEntry[];
  @Input()
  public countEntries: ThesaurusEntry[];
  @Input()
  public rulingEntries: ThesaurusEntry[];

  @Output()
  public modelChange: EventEmitter<MsLayout>;
  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  public sample: FormControl;
  public colCount: FormControl;
  public ruling: FormControl;
  public dimensions: FormArray;
  public counts$: BehaviorSubject<DecoratedCount[]>;

  constructor(
    private _formBuilder: FormBuilder,
    private _locService: MsLocationService
  ) {
    this.modelChange = new EventEmitter<MsLayout>();
    this.editorClose = new EventEmitter<any>();
    this._counts = [];
    this.counts$ = new BehaviorSubject<DecoratedCount[]>([]);
    // form
    this.sample = _formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.colCount = _formBuilder.control(0, Validators.required);
    this.ruling = _formBuilder.control(null, Validators.maxLength(50));
    this.dimensions = _formBuilder.array([]);
    this.form = _formBuilder.group({
      sample: this.sample,
      colCount: this.colCount,
      ruling: this.ruling,
      dimensions: this.dimensions,
    });
  }

  ngOnInit(): void {
    this.updateForm(this.model);
  }

  private updateForm(model: MsLayout | undefined): void {
    if (!model) {
      this.form.reset();
      this.counts$.next([]);
      return;
    }
    this.sample.setValue(this._locService.locationToString(model.sample));
    this.colCount.setValue(model.columnCount);
    this.ruling.setValue(model.rulingTechnique);
    this.dimensions.clear();
    for (let i = 0; i < model.dimensions?.length || 0; i++) {
      this.addDimension(model.dimensions[i]);
    }
    this.counts$.next(model.counts || []);

    this.form.markAsPristine();
  }

  private getModel(): MsLayout | null {
    return {
      sample: this._locService.parseLocation(this.sample.value),
      columnCount: this.colCount.value,
      rulingTechnique: this.ruling.value?.trim(),
      dimensions: this.getDimensions(),
      counts: this._counts.length? this._counts : undefined
    };
  }

  //#region Dimensions
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

  public addDimension(dimension?: PhysicalDimension): void {
    this.dimensions.push(this.getDimensionGroup(dimension));
    this.dimensions.markAsDirty();
  }

  public removeDimension(index: number): void {
    this.dimensions.removeAt(index);
    this.dimensions.markAsDirty();
  }

  public moveDimensionUp(index: number): void {
    if (index < 1) {
      return;
    }
    const dimension = this.dimensions.controls[index];
    this.dimensions.removeAt(index);
    this.dimensions.insert(index - 1, dimension);
    this.dimensions.markAsDirty();
  }

  public moveDimensionDown(index: number): void {
    if (index + 1 >= this.dimensions.length) {
      return;
    }
    const dimension = this.dimensions.controls[index];
    this.dimensions.removeAt(index);
    this.dimensions.insert(index + 1, dimension);
    this.dimensions.markAsDirty();
  }

  private getDimensions(): PhysicalDimension[] | undefined {
    const entries: PhysicalDimension[] = [];
    for (let i = 0; i < this.dimensions.length; i++) {
      const g = this.dimensions.at(i) as FormGroup;
      entries.push({
        value: g.controls.value.value,
        unit: g.controls.unit.value?.trim(),
        tag: g.controls.tag.value?.trim(),
      });
    }
    return entries.length ? entries : undefined;
  }
  //#endregion

  public onCountsChanged(counts: DecoratedCount[]): void {
    this._counts = counts || [];
    this.form.markAsDirty();
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    const model = this.getModel();
    if (!model) {
      return;
    }
    this.modelChange.emit(model);
  }
}
