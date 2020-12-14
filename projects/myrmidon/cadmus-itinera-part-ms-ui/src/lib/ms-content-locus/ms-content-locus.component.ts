import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MsContentLocus } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-ms-content-locus',
  templateUrl: './ms-content-locus.component.html',
  styleUrls: ['./ms-content-locus.component.css'],
})
export class MsContentLocusComponent implements OnInit {
  @Input()
  public model: MsContentLocus;

  @Output()
  public modelChange: EventEmitter<MsContentLocus>;

  @Output()
  public editorClose: EventEmitter<any>;

  public form: FormGroup;
  public citation: FormControl;
  public text: FormControl;

  constructor(formBuilder: FormBuilder) {
    // events
    this.modelChange = new EventEmitter<MsContentLocus>();
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
    this.form = formBuilder.group({
      citation: this.citation,
      text: this.text,
    });
  }

  ngOnInit(): void {
    this.updateForm(this.model);
  }

  private updateForm(model: MsContentLocus): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.citation.setValue(model.citation);
    this.text.setValue(model.text);
    this.form.markAsPristine();
  }

  private getModel(): MsContentLocus {
    return {
      citation: this.citation.value?.trim(),
      text: this.text.value?.trim()
    };
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
