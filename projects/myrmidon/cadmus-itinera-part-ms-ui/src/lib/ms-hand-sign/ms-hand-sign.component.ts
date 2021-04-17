import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsHandSign } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-ms-hand-sign',
  templateUrl: './ms-hand-sign.component.html',
  styleUrls: ['./ms-hand-sign.component.css'],
})
export class MsHandSignComponent implements OnInit {
  @Input()
  public sign: MsHandSign;

  @Input()
  public typeEntries: ThesaurusEntry[] | undefined;
  @Output()
  public signChange: EventEmitter<MsHandSign>;

  @Output()
  public editorClose: EventEmitter<any>;

  public id: FormControl;
  public type: FormControl;
  public imageId: FormControl;
  public description: FormControl;
  public form: FormGroup;

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  constructor(formBuilder: FormBuilder) {
    // events
    this.signChange = new EventEmitter<MsHandSign>();
    this.editorClose = new EventEmitter();
    // form
    this.id = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.type = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.imageId = formBuilder.control(null, Validators.maxLength(100));
    this.description = formBuilder.control(null, Validators.maxLength(2000));
    this.form = formBuilder.group({
      id: this.id,
      type: this.type,
      imageId: this.imageId,
      description: this.description
    });
  }

  ngOnInit(): void {
    this.updateForm(this.sign);
  }

  private updateForm(model: MsHandSign): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.id.setValue(model.id);
    this.type.setValue(model.type);
    this.imageId.setValue(model.imageId);
    this.description.setValue(model.description);
    this.form.markAsPristine();
  }

  private getModel(): MsHandSign {
    return {
      id: this.id.value?.trim(),
      type: this.type.value?.trim(),
      imageId: this.imageId.value?.trim(),
      description: this.description.value?.trim()
    };
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.signChange.emit(this.getModel());
  }
}
