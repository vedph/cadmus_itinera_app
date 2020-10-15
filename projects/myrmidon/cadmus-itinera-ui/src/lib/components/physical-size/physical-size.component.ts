import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { PhysicalDimension, PhysicalSize } from '@myrmidon/cadmus-itinera-core';

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
  public hasW: FormControl;
  public hasH: FormControl;
  public hasD: FormControl;

  public w: PhysicalDimension;
  public h: PhysicalDimension;
  public d: PhysicalDimension;
  public label: string;

  constructor(formBuilder: FormBuilder) {
    // events
    this.sizeChange = new EventEmitter<PhysicalSize>();
    // form
    this.tag = formBuilder.control(null, Validators.maxLength(50));
    this.hasW = formBuilder.control(true);
    this.hasH = formBuilder.control(false);
    this.hasD = formBuilder.control(false);

    this.form = formBuilder.group({
      tag: this.tag,
      hasW: this.hasW,
      hasH: this.hasH,
      hasD: this.hasD,
    });
  }

  ngOnInit(): void {
    if (this.parentForm) {
      this.parentForm.addControl('size', this.form);
    }
  }

  private getDimensionLabel(
    dimension: PhysicalDimension,
    uniqueUnit: boolean
  ): string {
    if (!dimension) {
      return '';
    }
    let s = dimension.value.toString();
    if (!uniqueUnit) {
      s += ' ' + dimension.unit;
    }
    return s;
  }

  private updateLabel(): void {
    const sb: string[] = [];

    // determine the unique unit if any
    let uniqueUnit: string = null;
    if (this.hasW.value) {
      uniqueUnit = this.w?.unit;
    }

    if (this.hasH.value) {
      if (!uniqueUnit) {
        uniqueUnit = this.h?.unit;
      } else if (this.h && uniqueUnit !== this.h.unit) {
        uniqueUnit = null;
      }
    }

    if (this.hasD.value) {
      if (!uniqueUnit) {
        uniqueUnit = this.d?.unit;
      } else if (this.d && uniqueUnit !== this.d.unit) {
        uniqueUnit = null;
      }
    }

    if (this.hasW.value) {
      sb.push(this.getDimensionLabel(this.w, uniqueUnit !== null));
    }
    if (this.hasH.value) {
      sb.push(this.getDimensionLabel(this.h, uniqueUnit !== null));
    }
    if (this.hasD.value) {
      sb.push(this.getDimensionLabel(this.d, uniqueUnit !== null));
    }

    this.label = sb.join(' × ') + (uniqueUnit ? ' ' + uniqueUnit : '');
  }

  private setModel(model: PhysicalSize): void {
    if (!model) {
      this.form.reset();
      this.w = this.h = this.d = null;
      this.label = null;
    } else {
      const defaultUnit = this.unitEntries?.length
        ? this.unitEntries[0].id
        : null;
      this.tag.setValue(model.tag);
      this.w = model.w || { value: 0, unit: defaultUnit };
      this.h = model.h || { value: 0, unit: defaultUnit };
      this.d = model.d || { value: 0, unit: defaultUnit };
      this.hasW.setValue(this.w?.value ? true : false);
      this.hasH.setValue(this.h?.value ? true : false);
      this.hasD.setValue(this.d?.value ? true : false);
      this.form.markAsPristine();
      this.updateLabel();
    }
  }

  private getModel(): PhysicalSize {
    return {
      tag: this.tag.value?.trim(),
      w: this.hasW.value ? this.w : null,
      h: this.hasH.value ? this.h : null,
      d: this.hasD.value ? this.d : null,
    };
  }

  public onWChange(w: PhysicalDimension): void {
    this.w = w;
    this.updateLabel();
    this.sizeChange.emit(this.getModel());
  }

  public onHChange(h: PhysicalDimension): void {
    this.h = h;
    this.updateLabel();
    this.sizeChange.emit(this.getModel());
  }

  public onDChange(d: PhysicalDimension): void {
    this.d = d;
    this.updateLabel();
    this.sizeChange.emit(this.getModel());
  }
}
