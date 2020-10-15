import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { PhysicalDimension } from '@myrmidon/cadmus-itinera-core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cadmus-physical-dimension',
  templateUrl: './physical-dimension.component.html',
  styleUrls: ['./physical-dimension.component.css'],
})
export class PhysicalDimensionComponent implements OnInit {
  private _dimension: PhysicalDimension;

  @Input()
  public parentForm: FormGroup;

  @Input()
  public label: string;

  @Input()
  public unitEntries: ThesaurusEntry[];

  @Input()
  public tagEntries: ThesaurusEntry[];

  @Input()
  public get dimension(): PhysicalDimension {
    return this._dimension;
  }
  public set dimension(value: PhysicalDimension) {
    this._dimension = value;
    this.setModel(this._dimension);
  }

  @Output()
  public dimensionChange: EventEmitter<PhysicalDimension>;

  public form: FormGroup;
  public value: FormControl;
  public unit: FormControl;
  public tag: FormControl;

  constructor(formBuilder: FormBuilder) {
    // events
    this.dimensionChange = new EventEmitter<PhysicalDimension>();
    // form
    this.value = formBuilder.control(0);
    this.unit = formBuilder.control(null, Validators.required);
    this.tag = formBuilder.control(null, Validators.maxLength(50));
    this.form = formBuilder.group({
      value: this.value,
      unit: this.unit,
      tag: this.tag,
    });
    this.label = 'dimension';

    // default entries
    this.unitEntries = [
      { id: 'cm', value: 'cm' },
      { id: 'mm', value: 'mm' },
    ];
  }

  ngOnInit(): void {
    if (this.parentForm) {
      this.parentForm.addControl(this.label, this.form);
    }
    this.setModel(this._dimension);
    // on change emit event
    this.form.valueChanges.pipe(debounceTime(300)).subscribe(_ => {
      const model = this.getModel();
      this.dimensionChange.emit(model);
    });
  }

  private setModel(model: PhysicalDimension): void {
    if (!model) {
      this.form.reset();
    } else {
      this.value.setValue(model.value);
      this.unit.setValue(model.unit);
      this.tag.setValue(model.tag);
      this.form.markAsPristine();
    }
  }

  private getModel(): PhysicalDimension {
    return {
      value: this.value.value || 0,
      unit: this.unit.value,
      tag: this.tag.value
    };
  }
}
