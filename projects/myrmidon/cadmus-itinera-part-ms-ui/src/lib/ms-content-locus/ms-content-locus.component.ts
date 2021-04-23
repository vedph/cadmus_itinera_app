import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MsContentLocus } from '@myrmidon/cadmus-itinera-core';
import { MsLocationService } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-ms-content-locus',
  templateUrl: './ms-content-locus.component.html',
  styleUrls: ['./ms-content-locus.component.css'],
})
export class MsContentLocusComponent implements OnInit {
  private _locus: MsContentLocus | undefined;

  @Input()
  public get locus(): MsContentLocus | undefined {
    return this._locus;
  }
  public set locus(value: MsContentLocus | undefined) {
    this._locus = value;
    this.updateForm(value);
  }

  @Output()
  public locusChange: EventEmitter<MsContentLocus>;

  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  public citation: FormControl;
  public text: FormControl;
  public refSheet: FormControl;
  public imageId: FormControl;

  constructor(
    formBuilder: FormBuilder,
    private _locService: MsLocationService
  ) {
    // events
    this.locusChange = new EventEmitter<MsContentLocus>();
    this.editorClose = new EventEmitter();
    // form
    this.citation = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.text = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(1000),
    ]);
    this.refSheet = formBuilder.control(null, [
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.imageId = formBuilder.control(null, Validators.maxLength(100));
    this.form = formBuilder.group({
      citation: this.citation,
      text: this.text,
      refSheet: this.refSheet,
      imageId: this.imageId,
    });
  }

  ngOnInit(): void {
    if (this._locus) {
      this.updateForm(this._locus);
    }
  }

  private updateForm(model: MsContentLocus): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.citation.setValue(model.citation);
    this.text.setValue(model.text);
    this.refSheet.setValue(this._locService.locationToString(model.refSheet));
    this.imageId.setValue(model.imageId);
    this.form.markAsPristine();
  }

  private getModel(): MsContentLocus {
    return {
      citation: this.citation.value?.trim(),
      text: this.text.value?.trim(),
      refSheet: this._locService.parseLocation(this.refSheet.value),
      imageId: this.imageId.value?.trim(),
    };
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.locusChange.emit(this.getModel());
  }
}
