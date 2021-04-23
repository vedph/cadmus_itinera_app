import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HistoricalDateModel } from '@myrmidon/cadmus-core';
import { MsPalimpsest, MsLocationService } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-ms-palimpsest',
  templateUrl: './ms-palimpsest.component.html',
  styleUrls: ['./ms-palimpsest.component.css'],
})
export class MsPalimpsestComponent implements OnInit {
  private _palimpsest: MsPalimpsest | undefined;

  @Input()
  public get palimpsest(): MsPalimpsest | undefined {
    return this._palimpsest;
  }
  public set palimpsest(value: MsPalimpsest | undefined) {
    this._palimpsest = value;
    this.updateForm(value);
  }

  @Output()
  public palimpsestChange: EventEmitter<MsPalimpsest>;

  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  public start: FormControl;
  public end: FormControl;
  public note: FormControl;

  public date: HistoricalDateModel;

  constructor(
    formBuilder: FormBuilder,
    private _msLocationService: MsLocationService
  ) {
    // events
    this.palimpsestChange = new EventEmitter<MsPalimpsest>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.start = formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.end = formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.form = formBuilder.group({
      start: this.start,
      end: this.end,
      note: this.note,
    });
  }

  ngOnInit(): void {
    if (this._palimpsest) {
      this.updateForm(this._palimpsest);
    }
  }

  private updateForm(model: MsPalimpsest | null): void {
    if (!model) {
      this.form.reset();
      this.date = null;
      return;
    }
    this.start.setValue(
      this._msLocationService.locationToString(model.range?.start)
    );
    this.end.setValue(
      this._msLocationService.locationToString(model.range?.end)
    );
    this.note.setValue(model.note);
    this.date = model.date;
  }

  private getModel(): MsPalimpsest {
    return {
      range: {
        start: this._msLocationService.parseLocation(this.start.value),
        end: this._msLocationService.parseLocation(this.end.value),
      },
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
    this.palimpsestChange.emit(model);
  }
}
