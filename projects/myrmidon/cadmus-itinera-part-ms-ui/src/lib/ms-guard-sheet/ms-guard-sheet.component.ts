import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HistoricalDateModel, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsGuardSheet } from '@myrmidon/cadmus-itinera-core';
import { MsLocationService } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-ms-guard-sheet',
  templateUrl: './ms-guard-sheet.component.html',
  styleUrls: ['./ms-guard-sheet.component.css'],
})
export class MsGuardSheetComponent implements OnInit {
  private _sheet : MsGuardSheet | undefined;

  @Input()
  public get sheet() : MsGuardSheet | undefined {
    return this._sheet;
  }
  public set sheet(value : MsGuardSheet | undefined) {
    this._sheet = value;
    this.updateForm(value);
  }

  @Input()
  public materialEntries: ThesaurusEntry[] | undefined;

  @Output()
  public sheetChange: EventEmitter<MsGuardSheet>;

  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  public back: FormControl;
  public material: FormControl;
  public start: FormControl;
  public end: FormControl;
  public note: FormControl;

  public date: HistoricalDateModel;

  constructor(
    formBuilder: FormBuilder,
    private _msLocationService: MsLocationService
  ) {
    // event
    this.sheetChange = new EventEmitter<MsGuardSheet>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.back = formBuilder.control(false);
    this.material = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.start = formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.end = formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.note = formBuilder.control(null, Validators.maxLength(300));
    this.form = formBuilder.group({
      back: this.back,
      material: this.material,
      start: this.start,
      end: this.end,
      note: this.note,
    });
  }

  ngOnInit(): void {
    if (this._sheet) {
      this.updateForm(this._sheet);
    }
  }

  private updateForm(model: MsGuardSheet): void {
    if (!model) {
      this.date = null;
      this.form.reset();
      return;
    }
    this.date = model.date;
    this.back.setValue(model.isBack);
    this.material.setValue(model.material);
    this.start.setValue(
      this._msLocationService.locationToString(model.range?.start)
    );
    this.end.setValue(
      this._msLocationService.locationToString(model.range?.end)
    );
    this.note.setValue(model.note);
    this.form.markAsPristine();
  }

  private getModel(): MsGuardSheet {
    return {
      isBack: this.back.value,
      material: this.material.value?.trim(),
      range: {
        start: this._msLocationService.parseLocation(this.start.value),
        end: this._msLocationService.parseLocation(this.end.value),
      },
      date: this.date,
      note: this.note.value?.trim(),
    };
  }

  public onDateChange(date: HistoricalDateModel): void {
    this.date = date;
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
    this.sheetChange.emit(model);
  }
}
