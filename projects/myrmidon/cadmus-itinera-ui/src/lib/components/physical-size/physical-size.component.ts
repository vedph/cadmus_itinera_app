import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { PhysicalDimension, PhysicalSize } from '@myrmidon/cadmus-itinera-core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cadmus-physical-size',
  templateUrl: './physical-size.component.html',
  styleUrls: ['./physical-size.component.css'],
})
export class PhysicalSizeComponent implements OnInit {
  private _size: PhysicalSize;

  @Input()
  public parentForm: FormGroup;

  @Input()
  public get size(): PhysicalSize {
    return this._size;
  }
  public set size(value: PhysicalSize) {
    this._size = value;
    this.setModel(this._size);
  }

  @Input()
  public unitEntries: ThesaurusEntry[];
  @Input()
  public tagEntries: ThesaurusEntry[];
  @Input()
  public dimTagEntries: ThesaurusEntry[];

  @Output()
  public sizeChange: EventEmitter<PhysicalSize>;

  public form: FormGroup;
  public tag: FormControl;
  public wValue: FormControl;
  public wUnit: FormControl;
  public wTag: FormControl;
  public hValue: FormControl;
  public hUnit: FormControl;
  public hTag: FormControl;
  public dValue: FormControl;
  public dUnit: FormControl;
  public dTag: FormControl;

  public label: string;

  constructor(formBuilder: FormBuilder) {
    // events
    this.sizeChange = new EventEmitter<PhysicalSize>();
    // form
    this.tag = formBuilder.control(null, Validators.maxLength(50));

    this.wValue = formBuilder.control(0);
    this.wUnit = formBuilder.control('cm', Validators.required);
    this.wTag = formBuilder.control(null, Validators.maxLength(50));

    this.hValue = formBuilder.control(0);
    this.hUnit = formBuilder.control('cm', Validators.required);
    this.hTag = formBuilder.control(null, Validators.maxLength(50));

    this.dValue = formBuilder.control(0);
    this.dUnit = formBuilder.control('cm', Validators.required);
    this.dTag = formBuilder.control(null, Validators.maxLength(50));

    this.form = formBuilder.group({
      tag: this.tag,
      wValue: this.wValue,
      wUnit: this.wUnit,
      wTag: this.wTag,
      hValue: this.hValue,
      hUnit: this.hUnit,
      hTag: this.hTag,
      dValue: this.dValue,
      dUnit: this.dUnit,
      dTag: this.dTag,
    });
  }

  ngOnInit(): void {
    if (this.parentForm) {
      this.parentForm.addControl('size', this.form);
    }

    this.form.valueChanges.pipe(debounceTime(400)).subscribe((_) => {
      const model = this.getModel();

      if (this.validateModel(model)) {
        this.updateLabel();
        this.sizeChange.emit(model);
      }
    });
  }

  private getDimensionLabel(value: number, unit: string): string {
    if (!value) {
      return '';
    }
    let s = value.toString();
    if (unit) {
      s += ' ' + unit;
    }
    return s;
  }

  private validateModel(model: PhysicalSize): boolean {
    if (!model) {
      return false;
    }
    return (
      // at least 1 dim with unit
      ((model.w?.value && !!model.w.unit) ||
        (model.h?.value && !!model.h.unit) ||
        (model.d?.value && !!model.d.unit)) &&
      // no dim without unit
      !(model.w?.value && !model.w.unit) &&
      !(model.h?.value && !model.h.unit) &&
      !(model.d?.value && !model.d.unit)
    );
  }

  private updateLabel(): void {
    const sb: string[] = [];

    // determine the unique unit if any
    let uniqueUnit: string = null;
    if (this.wValue.value) {
      uniqueUnit = this.wUnit.value;
    }

    if (this.hValue.value) {
      if (!uniqueUnit) {
        uniqueUnit = this.hUnit.value;
      } else if (uniqueUnit !== this.hUnit.value) {
        uniqueUnit = null;
      }
    }

    if (this.dValue.value) {
      if (!uniqueUnit) {
        uniqueUnit = this.dUnit.value;
      } else if (uniqueUnit !== this.dUnit.value) {
        uniqueUnit = null;
      }
    }

    if (this.wValue.value) {
      sb.push(
        this.getDimensionLabel(
          this.wValue.value,
          uniqueUnit ? null : this.wUnit.value
        )
      );
    }
    if (this.hValue.value) {
      sb.push(
        this.getDimensionLabel(
          this.hValue.value,
          uniqueUnit ? null : this.hUnit.value
        )
      );
    }
    if (this.dValue.value) {
      sb.push(
        this.getDimensionLabel(
          this.dValue.value,
          uniqueUnit ? null : this.dUnit.value
        )
      );
    }

    this.label = sb.join(' × ') + (uniqueUnit ? ' ' + uniqueUnit : '');
  }

  private setModel(model: PhysicalSize): void {
    if (!model) {
      this.form.reset();
      this.label = null;
    } else {
      const defaultUnit = this.unitEntries?.length
        ? this.unitEntries[0].id
        : null;
      this.tag.setValue(model.tag);
      if (model.w?.value) {
        this.wValue.setValue(model.w.value);
        this.wUnit.setValue(model.w.unit);
        this.wTag.setValue(model.w.tag);
      } else {
        this.wValue.reset();
        this.wUnit.reset();
        this.wTag.reset();
      }

      if (model.h?.value) {
        this.hValue.setValue(model.h.value);
        this.hUnit.setValue(model.h.unit);
        this.hTag.setValue(model.h.tag);
      } else {
        this.hValue.reset();
        this.hUnit.reset();
        this.hTag.reset();
      }

      if (model.d?.value) {
        this.dValue.setValue(model.d.value);
        this.dUnit.setValue(model.d.unit);
        this.dTag.setValue(model.d.tag);
      } else {
        this.dValue.reset();
        this.dUnit.reset();
        this.dTag.reset();
      }

      this.form.markAsPristine();
      this.updateLabel();
    }
  }

  private getDimension(
    v: FormControl,
    u: FormControl,
    t: FormControl
  ): PhysicalDimension {
    return {
      value: v.value || 0,
      unit: u.value,
      tag: t.value?.trim(),
    };
  }

  private getModel(): PhysicalSize {
    return {
      tag: this.tag.value?.trim(),
      w: this.wValue.value
        ? this.getDimension(this.wValue, this.wUnit, this.wTag)
        : null,
      h: this.hValue.value
        ? this.getDimension(this.hValue, this.hUnit, this.hTag)
        : null,
      d: this.dValue.value
        ? this.getDimension(this.dValue, this.dUnit, this.dTag)
        : null,
    };
  }
}
