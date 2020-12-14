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
  MsHandInstance,
  MsLocationService,
  MsRubrication,
} from '@myrmidon/cadmus-itinera-core';

/**
 * Manuscript's hand editor.
 */
@Component({
  selector: 'itinera-ms-hand',
  templateUrl: './ms-hand.component.html',
  styleUrls: ['./ms-hand.component.css'],
})
export class MsHandComponent implements OnInit {
  @Input()
  public model: MsHandInstance;

  @Output()
  public modelChange: EventEmitter<MsHandInstance>;
  @Output()
  public editorClose: EventEmitter<any>;

  @Input()
  public reasonEntries: ThesaurusEntry[];
  @Input()
  public rubrEntries: ThesaurusEntry[];
  @Input()
  public langEntries: ThesaurusEntry[];

  public id: FormControl;
  public idReason: FormControl;
  public start: FormControl;
  public end: FormControl;
  public extentNote: FormControl;
  public rubrications: FormArray;

  public subForm: FormGroup;
  public subPresent: FormControl;
  public subLocation: FormControl;
  public subLanguage: FormControl;
  public subText: FormControl;

  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _msLocationService: MsLocationService
  ) {
    // events
    this.modelChange = new EventEmitter<MsHandInstance>();
    this.editorClose = new EventEmitter();
    // form
    this.id = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.idReason = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.start = _formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.end = _formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.extentNote = _formBuilder.control(null, Validators.maxLength(500));
    // rubrications
    this.rubrications = _formBuilder.array([]);

    // the subscription form gets enabled/disabled according to this
    // (disabling the nested form also disables its own validation)
    this.subPresent = _formBuilder.control(false);

    // subscription form
    this.subLocation = _formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.subLanguage = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.subText = _formBuilder.control(null, Validators.maxLength(1000));
    this.subForm = _formBuilder.group({
      subLocation: this.subLocation,
      subLanguage: this.subLanguage,
      subText: this.subText,
    });

    // root form
    this.form = _formBuilder.group({
      id: this.id,
      idReason: this.idReason,
      start: this.start,
      end: this.end,
      extentNote: this.extentNote,
      rubrications: this.rubrications,
      subPresent: this.subPresent,
      subscription: this.subForm,
    });
  }

  private toggleSubscription(enabled: boolean): void {
    if (enabled) {
      this.subForm.enable();
    } else {
      this.subForm.disable();
    }
  }

  ngOnInit(): void {
    this.toggleSubscription(false);
    this.subPresent.valueChanges.subscribe((present) => {
      this.toggleSubscription(present);
    });
    this.updateForm(this.model);
  }

  private updateForm(model: MsHandInstance): void {
    this.id.setValue(model.id);
    this.idReason.setValue(model.idReason);
    this.start.setValue(this._msLocationService.locationToString(model.start));
    this.end.setValue(this._msLocationService.locationToString(model.end));
    this.extentNote.setValue(model.extentNote);

    // rubrications
    this.rubrications.clear();
    for (const rubrication of model.rubrications || []) {
      this.addRubrication(rubrication);
    }

    // subscription
    if (this.model.subscription) {
      this.subPresent.setValue(true);
      this.subLocation.setValue(model.subscription.location);
      this.subLanguage.setValue(model.subscription.language);
      this.subText.setValue(model.subscription.text);
    } else {
      this.subPresent.setValue(false);
      this.subForm.reset();
    }
  }

  private getModel(): MsHandInstance {
    const model: MsHandInstance = {
      id: this.id.value?.trim(),
      idReason: this.idReason.value?.trim(),
      start: this._msLocationService.parseLocation(this.start.value),
      end: this._msLocationService.parseLocation(this.end.value),
      extentNote: this.extentNote.value?.trim(),
    };

    // rubrications
    if (this.rubrications.length) {
      model.rubrications = [];
      for (let i = 0; i < this.rubrications.length; i++) {
        const g = this.rubrications.controls[i] as FormGroup;
        model.rubrications.push({
          location: this._msLocationService.parseLocation(
            g.controls.location.value
          ),
          type: g.controls.type.value?.trim(),
          description: g.controls.description.value?.trim(),
          issues: g.controls.issues.value?.trim(),
        });
      }
    }

    // subscription
    if (this.subPresent.value) {
      model.subscription = {
        location: this._msLocationService.parseLocation(this.subLocation.value),
        language: this.subLanguage.value?.trim(),
        text: this.subText.value?.trim(),
      };
    }

    return model;
  }

  private getRubricationGroup(rubrication?: MsRubrication): FormGroup {
    return this._formBuilder.group({
      location: this._formBuilder.control(
        this._msLocationService.locationToString(rubrication?.location),
        [Validators.required, Validators.pattern(MsLocationService.locRegexp)]
      ),
      type: this._formBuilder.control(rubrication?.type, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: this._formBuilder.control(
        rubrication?.description,
        Validators.maxLength(500)
      ),
      issues: this._formBuilder.control(
        rubrication?.issues,
        Validators.maxLength(500)
      ),
    });
  }

  public addRubrication(item?: MsRubrication): void {
    this.rubrications.push(this.getRubricationGroup(item));
  }

  public removeRubrication(index: number): void {
    this.rubrications.removeAt(index);
  }

  public moveRubricationUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.rubrications.controls[index];
    this.rubrications.removeAt(index);
    this.rubrications.insert(index - 1, item);
  }

  public moveRubricationDown(index: number): void {
    if (index + 1 >= this.rubrications.length) {
      return;
    }
    const item = this.rubrications.controls[index];
    this.rubrications.removeAt(index);
    this.rubrications.insert(index + 1, item);
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
