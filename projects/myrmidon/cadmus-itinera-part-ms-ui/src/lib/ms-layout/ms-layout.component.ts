import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { PhysicalDimension, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  DecoratedCount,
  MsLayoutService,
  MsLocationService,
  MS_LAYOUT_FORMULA_REGEX,
} from '@myrmidon/cadmus-itinera-core';
import { MsLayoutRectSet } from '@myrmidon/cadmus-itinera-ui';
import { MsLayout } from '../ms-layouts-part';

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
  public formulaError: string | undefined;
  public rectSet: MsLayoutRectSet | undefined;
  public figHeight = 400;

  constructor(
    private _formBuilder: FormBuilder,
    private _locService: MsLocationService,
    private _msLayoutService: MsLayoutService
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
    this.formula = _formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MS_LAYOUT_FORMULA_REGEX),
    ]);
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

  private getHW(rectSet: MsLayoutRectSet): { height: number; width: number } {
    return {
      height: rectSet.height.reduce((a, b) => {
        return a + b.value;
      }, 0),
      width: rectSet.width.reduce((a, b) => {
        return a + b.value;
      }, 0),
    };
  }

  /**
   * Apply the MS layout formula by adding all the dimensions got from it.
   */
  public applyFormula(): void {
    // parse
    if (this.formulaForm.invalid) {
      return;
    }
    const result = this._msLayoutService.parseFormula(this.formula.value);
    if (result.error) {
      this.formulaError = result.error.message;
      return;
    } else {
      this.formulaError = undefined;
    }

    // get rectangles
    const map: Map<string, number> = result.value;
    this.rectSet = {
      height: this._msLayoutService.getHeightRects(map),
      width: this._msLayoutService.getWidthRects(map),
      gap: 4,
    };

    // update dimensions
    this.dimensions.value.forEach((c: DecoratedCount) => {
      if (!map.has(c.id)) {
        map.set(c.id, c.value);
      }
    });
    this.dimensions.clear();

    // get sorted keys and add dimensions in order
    const sortedKeys = this._msLayoutService.getSortedKeys(
      this._msLayoutService.getColumnCount(map),
      map
    );
    sortedKeys.forEach((key) => {
      this.dimensions.push(
        this.getDimensionGroup({
          tag: key,
          value: map.get(key),
          unit: 'mm',
        })
      );
    });

    // check sum
    const hw = this.getHW(this.rectSet);
    const sb: string[] = [];
    const expHeight = map.get('height');
    const expWidth = map.get('width');
    if (hw.height !== expHeight) {
      sb.push(`expected (${expHeight}) and actual (${hw.height}) height`);
    }
    if (hw.width !== expWidth) {
      sb.push(`expected (${expWidth}) and actual (${hw.width}) width`);
    }
    if (sb.length) {
      sb.splice(0, 0, 'Mismatch: ');
      this.formulaError = sb.join('');
    }
  }

  public onFigSliderChange(change: MatSliderChange): void {
    this.figHeight = change.value;
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
