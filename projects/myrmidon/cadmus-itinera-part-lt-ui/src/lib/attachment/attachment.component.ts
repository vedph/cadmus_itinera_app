import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { Attachment } from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cadmus-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css'],
})
export class AttachmentComponent implements OnInit {
  private _attachment: Attachment | undefined;

  @Input()
  public get attachment(): Attachment | undefined {
    return this._attachment;
  }
  public set attachment(value: Attachment | undefined) {
    this._attachment = value;
    this.updateForm(value);
  }

  // epist-attachment-types
  @Input()
  public attTypeEntries: ThesaurusEntry[] | undefined;

  @Output()
  public attachmentChange: EventEmitter<Attachment>;
  @Output()
  public editorClose: EventEmitter<any>;

  public id: FormControl;
  public type: FormControl;
  public name: FormControl;
  public lost: FormControl;
  public unknown: FormControl;
  public portion: FormControl;
  public note: FormControl;
  public form: FormGroup;
  public ids$: BehaviorSubject<string[]>;

  constructor(formBuilder: FormBuilder) {
    this.attachmentChange = new EventEmitter<Attachment>();
    this.editorClose = new EventEmitter<any>();
    this.ids$ = new BehaviorSubject<string[]>([]);
    // form
    this.id = formBuilder.control(null, Validators.maxLength(50));
    this.type = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.name = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.lost = formBuilder.control(false);
    this.unknown = formBuilder.control(false);
    this.portion = formBuilder.control(null, Validators.maxLength(50));
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.form = formBuilder.group({
      id: this.id,
      type: this.type,
      name: this.name,
      lost: this.lost,
      unknown: this.unknown,
      portion: this.portion,
      note: this.note,
    });
  }

  ngOnInit(): void {
    this.updateForm(this.attachment);
  }

  private updateForm(model: Attachment | undefined): void {
    if (!model) {
      this.ids$.next([]);
      this.form.reset();
      return;
    }

    this.id.setValue(model.id);
    this.type.setValue(model.type);
    this.name.setValue(model.name);
    this.lost.setValue(model.isLost);
    this.unknown.setValue(model.isUnknown);
    this.portion.setValue(model.portion);
    this.note.setValue(model.portion);
    this.ids$.next(model.externalIds || []);

    this.form.markAsPristine();
  }

  private getModel(): Attachment {
    return {
      id: this.id.value?.trim(),
      externalIds: this.ids$.value?.length ? this.ids$.value : undefined,
      type: this.type.value?.trim(),
      name: this.name.value?.trim(),
      isLost: this.lost.value,
      isUnknown: this.unknown.value,
      portion: this.portion.value?.trim(),
      note: this.note.value?.trim(),
    };
  }

  public onIdsChanged(ids: string[]): void {
    this.ids$.next(ids);
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
    if (!model) {
      return;
    }
    this.attachmentChange.emit(model);
  }
}
