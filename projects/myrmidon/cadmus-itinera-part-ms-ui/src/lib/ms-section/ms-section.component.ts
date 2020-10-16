import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HistoricalDate } from '@myrmidon/cadmus-core';
import { MsSection } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'cadmus-ms-section',
  templateUrl: './ms-section.component.html',
  styleUrls: ['./ms-section.component.css'],
})
export class MsSectionComponent implements OnInit {
  private _model: MsSection;

  @Input()
  public get model(): MsSection {
    return this._model;
  }
  public set model(value: MsSection) {
    this._model = value;
    this.setModel(this._model);
  }

  @Output()
  public modelChange: EventEmitter<MsSection>;

  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  public tag: FormControl;
  public label: FormControl;
  public start: FormControl;
  public end: FormControl;
  public date: HistoricalDate;

  constructor(formBuilder: FormBuilder) {
    // event
    this.modelChange = new EventEmitter<MsSection>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.tag = formBuilder.control(null, Validators.maxLength(50));
    this.label = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.start = formBuilder.control(null, [
      Validators.required,
      Validators.pattern(new RegExp('^\\s*(\\d+)([rv])\\s*(\\d+)?\\s*$', 'i')),
    ]);
    this.end = formBuilder.control(null, [
      Validators.required,
      Validators.pattern(new RegExp('^\\s*(\\d+)([rv])\\s*(\\d+)?\\s*$', 'i')),
    ]);
    this.form = formBuilder.group({
      tag: this.tag,
      label: this.label,
      start: this.start,
      end: this.end,
    });
  }

  ngOnInit(): void {}

  private setModel(model: MsSection): void {
    if (!model) {
      this.date = null;
      this.form.reset();
      return;
    }
    this.date = model.date;
    this.tag.setValue(model.tag);
    this.label.setValue(model.label);
    this.start.setValue(model.start);
    this.end.setValue(model.end);
  }

  private getModel(): MsSection {
    return {
      date: this.date,
      tag: this.tag.value?.trim(),
      label: this.label.value?.trim(),
      start: this.start.value?.trim(),
      end: this.end.value?.trim(),
    };
  }

  public onDateChange(date: HistoricalDate): void {
    this.date = date;
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    const model = this.getModel();
    this.modelChange.emit(model);
  }
}
