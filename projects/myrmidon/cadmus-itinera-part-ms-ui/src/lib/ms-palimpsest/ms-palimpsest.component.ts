import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HistoricalDate } from '@myrmidon/cadmus-core';
import { MsPalimpsest, MsLocationService } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'cadmus-ms-palimpsest',
  templateUrl: './ms-palimpsest.component.html',
  styleUrls: ['./ms-palimpsest.component.css'],
})
export class MsPalimpsestComponent implements OnInit {
  private _model: MsPalimpsest;

  @Input()
  public get model(): MsPalimpsest {
    return this._model;
  }
  public set model(value: MsPalimpsest) {
    this._model = value;
    this.setModel(this._model);
  }

  @Output()
  public modelChange: EventEmitter<MsPalimpsest>;

  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  public location: FormControl;
  public note: FormControl;

  public date: HistoricalDate;

  constructor(
    formBuilder: FormBuilder,
    private _msLocationService: MsLocationService
  ) {
    // events
    this.modelChange = new EventEmitter<MsPalimpsest>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.location = formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.form = formBuilder.group({
      location: this.location,
      note: this.note
    });
  }

  ngOnInit(): void {}

  private setModel(model: MsPalimpsest | null): void {
    if (!model) {
      this.form.reset();
      this.date = null;
      return;
    }
    this.location.setValue(
      this._msLocationService.locationToString(model.location)
    );
    this.note.setValue(model.note);
    this.date = model.date;
  }

  private getModel(): MsPalimpsest {
    return {
      location: this._msLocationService.parseLocation(this.location.value),
      note: this.note.value,
      date: this.date,
    };
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
