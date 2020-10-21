import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  MsContent,
  MsContentUnit,
  MsLocationService,
} from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'cadmus-ms-content',
  templateUrl: './ms-content.component.html',
  styleUrls: ['./ms-content.component.css'],
})
export class MsContentComponent implements OnInit {
  private _model: MsContent;

  @Input()
  public get model(): MsContent {
    return this._model;
  }
  public set model(value: MsContent) {
    this._model = value;
    this.setModel(this._model);
  }

  @Output()
  public modelChange: EventEmitter<MsContent>;

  @Output()
  public editorClose: EventEmitter<any>;

  @Input()
  public stateEntries: ThesaurusEntry[];

  public form: FormGroup;
  public author: FormControl;
  public claimedAuthor: FormControl;
  public work: FormControl;
  public start: FormControl;
  public end: FormControl;
  public state: FormControl;
  public note: FormControl;
  public units: FormArray;

  constructor(
    private _formBuilder: FormBuilder,
    private _msLocationService: MsLocationService
  ) {
    // event
    this.modelChange = new EventEmitter<MsContent>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.author = _formBuilder.control(null, Validators.maxLength(50));
    this.claimedAuthor = _formBuilder.control(null, Validators.maxLength(50));
    this.work = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.start = _formBuilder.control(
      null,
      Validators.pattern(MsLocationService.locRegexp)
    );
    this.end = _formBuilder.control(
      null,
      Validators.pattern(MsLocationService.locRegexp)
    );
    this.state = _formBuilder.control(null, Validators.maxLength(50));
    this.note = _formBuilder.control(null, Validators.maxLength(500));
    this.units = _formBuilder.array([]);
    this.form = _formBuilder.group({
      author: this.author,
      claimedAuthor: this.claimedAuthor,
      work: this.work,
      start: this.start,
      end: this.end,
      state: this.state,
      note: this.note,
      units: this.units,
    });
  }

  ngOnInit(): void {}

  private setModel(model: MsContent): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.author.setValue(model.author);
    this.claimedAuthor.setValue(model.claimedAuthor);
    this.work.setValue(model.work);
    this.start.setValue(this._msLocationService.locationToString(model.start));
    this.end.setValue(this._msLocationService.locationToString(model.end));
    this.state.setValue(model.state);
    this.note.setValue(model.note);
    if (model.units?.length) {
      for (const unit of model.units) {
        this.addUnit(unit);
      }
    }
  }

  private getModel(): MsContent {
    const model: MsContent = {
      author: this.author.value?.trim(),
      claimedAuthor: this.claimedAuthor.value?.trim(),
      work: this.work.value?.trim(),
      start: this._msLocationService.parseLocation(this.start.value),
      end: this._msLocationService.parseLocation(this.end.value),
      state: this.state.value?.trim(),
      note: this.note.value?.trim(),
    };

    for (let i = 0; i < this.units.length; i++) {
      const g = this.units.controls[i] as FormGroup;
      model.units.push({
        label: g.controls.label.value?.trim(),
        incipit: g.controls.incipit.value?.trim(),
        explicit: g.controls.explicit.value?.trim(),
      });
    }

    return model;
  }

  private getUnitGroup(unit?: MsContentUnit): FormGroup {
    return this._formBuilder.group({
      label: this._formBuilder.control(unit?.label, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      incipit: this._formBuilder.control(
        unit?.incipit,
        Validators.maxLength(500)
      ),
      explicit: this._formBuilder.control(
        unit?.explicit,
        Validators.maxLength(500)
      ),
    });
  }

  public addUnit(unit?: MsContentUnit): void {
    this.units.push(this.getUnitGroup(unit));
  }

  public removeUnit(index: number): void {
    this.units.removeAt(index);
  }

  public moveUnitUp(index: number): void {
    if (index < 1) {
      return;
    }
    const unit = this.units.controls[index];
    this.units.removeAt(index);
    this.units.insert(index - 1, unit);
  }

  public moveUnitDown(index: number): void {
    if (index + 1 >= this.units.length) {
      return;
    }
    const unit = this.units.controls[index];
    this.units.removeAt(index);
    this.units.insert(index + 1, unit);
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.modelChange.emit(this.getModel());
  }
}
