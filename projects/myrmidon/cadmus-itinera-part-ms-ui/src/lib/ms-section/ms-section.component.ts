import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HistoricalDateModel, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsLocationService, MsSection } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-ms-section',
  templateUrl: './ms-section.component.html',
  styleUrls: ['./ms-section.component.css'],
})
export class MsSectionComponent implements OnInit {
  private _section : MsSection | undefined;

  @Input()
  public get section() : MsSection | undefined {
    return this._section;
  }
  public set section(value : MsSection | undefined) {
    this._section = value;
    this.updateForm(value);
  }

  @Output()
  public sectionChange: EventEmitter<MsSection>;

  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  public tag: FormControl;
  public label: FormControl;
  public start: FormControl;
  public end: FormControl;
  public hasDate: FormControl;
  public date: HistoricalDateModel;

  constructor(
    formBuilder: FormBuilder,
    private _locService: MsLocationService
  ) {
    // event
    this.sectionChange = new EventEmitter<MsSection>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.tag = formBuilder.control(null, Validators.maxLength(50));
    this.label = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.start = formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.end = formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.hasDate = formBuilder.control(false);
    this.form = formBuilder.group({
      tag: this.tag,
      label: this.label,
      start: this.start,
      end: this.end,
      hasDate: this.hasDate
    });
  }

  ngOnInit(): void {
    if (this._section) {
      this.updateForm(this._section);
    }
  }

  private updateForm(model: MsSection): void {
    if (!model) {
      this.date = null;
      this.form.reset();
      return;
    }
    this.date = model.date;
    this.hasDate.setValue(model.date? true : false);

    this.tag.setValue(model.tag);
    this.label.setValue(model.label);
    this.start.setValue(this._locService.locationToString(model.start));
    this.end.setValue(this._locService.locationToString(model.end));
  }

  private getModel(): MsSection {
    return {
      date: this.hasDate? this.date : undefined,
      tag: this.tag.value?.trim(),
      label: this.label.value?.trim(),
      start: this._locService.parseLocation(this.start.value),
      end: this._locService.parseLocation(this.end.value)
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
    this.sectionChange.emit(model);
  }
}
