import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HistoricalDate, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsGuardSheet } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'lib-ms-guard-sheet',
  templateUrl: './ms-guard-sheet.component.html',
  styleUrls: ['./ms-guard-sheet.component.css'],
})
export class MsGuardSheetComponent implements OnInit {
  private _model: MsGuardSheet;

  @Input()
  public get model(): MsGuardSheet {
    return this._model;
  }
  public set model(value: MsGuardSheet) {
    this._model = value;
    this.setModel(this._model);
  }

  @Input()
  public materialEntries: ThesaurusEntry[];

  @Output()
  public modelChange: EventEmitter<MsGuardSheet>;

  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  public back: FormControl;
  public material: FormControl;
  public location: FormControl;
  public note: FormControl;

  public date: HistoricalDate;

  constructor(formBuilder: FormBuilder) {
    // event
    this.modelChange = new EventEmitter<MsGuardSheet>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.back = formBuilder.control(false);
    this.material = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    // TODO custom validator for location
    this.location = formBuilder.control(null, Validators.required);
    this.note = formBuilder.control(null, Validators.maxLength(300));
    this.form = formBuilder.group({
      back: this.back,
      material: this.material,
      location: this.location,
      note: this.note,
    });
  }

  ngOnInit(): void {}

  private setModel(model: MsGuardSheet): void {
    if (!model) {
      this.date = null;
      this.form.reset();
      return;
    }
    this.date = model.date;
    this.back.setValue(model.isBack);
    this.material.setValue(model.material);
    this.location.setValue(model.location);
    this.note.setValue(model.note);
    this.form.markAsPristine();
  }

  private getModel(): MsGuardSheet {
    // TODO
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
