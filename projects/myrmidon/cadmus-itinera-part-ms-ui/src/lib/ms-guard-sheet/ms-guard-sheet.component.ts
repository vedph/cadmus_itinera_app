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
  @Input()
  public model: MsGuardSheet;

  @Input()
  public materialEntries: ThesaurusEntry[] | undefined;

  @Output()
  public modelChange: EventEmitter<MsGuardSheet>;

  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  public back: FormControl;
  public material: FormControl;
  public location: FormControl;
  public note: FormControl;

  public date: HistoricalDateModel;

  constructor(
    formBuilder: FormBuilder,
    private _msLocationService: MsLocationService
  ) {
    // event
    this.modelChange = new EventEmitter<MsGuardSheet>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.back = formBuilder.control(false);
    this.material = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.location = formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.note = formBuilder.control(null, Validators.maxLength(300));
    this.form = formBuilder.group({
      back: this.back,
      material: this.material,
      location: this.location,
      note: this.note,
    });
  }

  ngOnInit(): void {
    this.updateForm(this.model);
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
    this.location.setValue(
      this._msLocationService.locationToString(model.location)
    );
    this.note.setValue(model.note);
    this.form.markAsPristine();
  }

  private getModel(): MsGuardSheet {
    return {
      isBack: this.back.value,
      material: this.material.value?.trim(),
      location: this._msLocationService.parseLocation(this.location.value),
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
    this.modelChange.emit(model);
  }
}
