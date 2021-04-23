import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PhysicalDimension, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  DecoratedCount,
  MsLocationService,
} from '@myrmidon/cadmus-itinera-core';
import { MsLayout } from '../ms-layouts-part';
import { MsLayoutFormulaService } from './ms-layout-formula.service';

@Component({
  selector: 'itinera-ms-layout',
  templateUrl: './ms-layout.component.html',
  styleUrls: ['./ms-layout.component.css'],
})
export class MsLayoutComponent implements OnInit {
  private _layout: MsLayout | undefined;

  @Input()
  public get layout(): MsLayout | undefined {
    return this._layout;
  }
  public set layout(value: MsLayout | undefined) {
    this._layout = value;
    this.updateForm(value);
  }

  @Input()
  public unitEntries: ThesaurusEntry[] | undefined;
  @Input()
  public dimEntries: ThesaurusEntry[] | undefined;
  @Input()
  public countEntries: ThesaurusEntry[] | undefined;
  @Input()
  public rulingEntries: ThesaurusEntry[] | undefined;

  @Output()
  public layoutChange: EventEmitter<MsLayout>;
  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  public sample: FormControl;
  public colCount: FormControl;
  public ruling: FormControl;
  public derolez: FormControl;
  public pricking: FormControl;
  public dimensions: FormArray;
  public counts: FormControl;
  public formula: FormControl;
  public formulaForm: FormGroup;

  public initialCounts: DecoratedCount[];

  constructor(
    private _formBuilder: FormBuilder,
    private _locService: MsLocationService,
    private _layoutService: MsLayoutFormulaService
  ) {
    this.layoutChange = new EventEmitter<MsLayout>();
    this.editorClose = new EventEmitter<any>();
    this.initialCounts = [];
    // form
    this.sample = _formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.colCount = _formBuilder.control(0, Validators.required);
    this.ruling = _formBuilder.control(null, Validators.maxLength(50));
    this.derolez = _formBuilder.control(null, Validators.maxLength(50));
    this.pricking = _formBuilder.control(null, Validators.maxLength(50));
    this.dimensions = _formBuilder.array([]);
    this.counts = _formBuilder.control([]);
    this.form = _formBuilder.group({
      sample: this.sample,
      colCount: this.colCount,
      ruling: this.ruling,
      derolez: this.derolez,
      pricking: this.pricking,
      dimensions: this.dimensions,
      counts: this.counts,
    });
    // layout formula
    this.formula = _formBuilder.control(
      null,
      Validators.pattern(MsLayoutFormulaService.layRegexp)
    );
    this.formulaForm = _formBuilder.group({
      formula: this.formula,
    });
  }

  ngOnInit(): void {
    if (this._layout) {
      this.updateForm(this._layout);
    }
  }

  private updateForm(model: MsLayout | undefined): void {
    if (!model) {
      this.form.reset();
      this.initialCounts = [];
      return;
    }
    this.sample.setValue(this._locService.locationToString(model.sample));
    this.colCount.setValue(model.columnCount);
    this.ruling.setValue(model.rulingTechnique);
    this.derolez.setValue(model.derolez);
    this.pricking.setValue(model.pricking);
    this.dimensions.clear();
    for (let i = 0; i < model.dimensions?.length || 0; i++) {
      this.addDimension(model.dimensions[i]);
    }
    this.initialCounts = model.counts || [];

    this.form.markAsPristine();
  }

  private getModel(): MsLayout | null {
    return {
      sample: this._locService.parseLocation(this.sample.value),
      columnCount: this.colCount.value,
      rulingTechnique: this.ruling.value?.trim(),
      derolez: this.derolez.value?.trim(),
      pricking: this.pricking.value?.trim(),
      dimensions: this.getDimensions(),
      counts: this.counts.value?.length ? this.counts.value : undefined,
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

  public onCountsChange(counts: DecoratedCount[]): void {
    this.counts.setValue(counts);
    this.form.markAsDirty();
  }

  public addFormulaCounts(): void {
    if (this.formulaForm.invalid) {
      return;
    }
    const map = this._layoutService.parseFormula(this.formula.value);
    if (!map) {
      return;
    }
    this.counts.value.forEach((c: DecoratedCount) => {
      if (!map.has(c.id)) {
        map.set(c.id, c.value);
      }
    });
    const newCounts = [];
    map.forEach((value, key) => {
      newCounts.push({
        id: key,
        value: value,
      });
    });
    this.counts.setValue(newCounts);
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
    this.layoutChange.emit(model);
  }
}
