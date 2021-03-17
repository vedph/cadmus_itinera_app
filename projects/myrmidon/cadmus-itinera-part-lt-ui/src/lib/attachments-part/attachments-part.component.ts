import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';

import { AttachmentsPart, ATTACHMENTS_PART_TYPEID } from '../attachments-part';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Attachment } from '@myrmidon/cadmus-itinera-core';

/**
 * Attachments part editor.
 * Thesauri: epist-attachment-types (optional).
 */
@Component({
  selector: 'itinera-attachments-part',
  templateUrl: './attachments-part.component.html',
  styleUrls: ['./attachments-part.component.css'],
})
export class AttachmentsPartComponent
  extends ModelEditorComponentBase<AttachmentsPart>
  implements OnInit, AfterViewInit, OnDestroy {
  private _nameSubscription: Subscription;

  @ViewChildren('name') nameQueryList: QueryList<any>;

  public attachments: FormArray;

  // epist-attachment-types
  public typeEntries: ThesaurusEntry[];

  constructor(authService: AuthService, private _formBuilder: FormBuilder) {
    super(authService);
    // form
    this.attachments = _formBuilder.array([], Validators.required);
    this.form = _formBuilder.group({
      attachments: this.attachments,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  public ngAfterViewInit(): void {
    this._nameSubscription = this.nameQueryList.changes
      .pipe(debounceTime(300))
      .subscribe((_) => {
        if (this.nameQueryList.length > 0) {
          this.nameQueryList.last.nativeElement.focus();
        }
      });
  }

  public ngOnDestroy(): void {
    this._nameSubscription.unsubscribe();
  }

  private updateForm(model: AttachmentsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.attachments.clear();
    for (const a of model.attachments || []) {
      this.addAttachment(a);
    }
    this.form.markAsPristine();
  }

  protected onModelSet(model: AttachmentsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    const key = 'epist-attachment-types';
    if (this.thesauri && this.thesauri[key]) {
      this.typeEntries = this.thesauri[key].entries;
    } else {
      this.typeEntries = null;
    }
  }

  protected getModelFromForm(): AttachmentsPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: ATTACHMENTS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        attachments: [],
      };
    }
    part.attachments = [];
    for (let i = 0; i < this.attachments.length; i++) {
      const g = this.attachments.controls[i] as FormGroup;
      part.attachments.push({
        type: g.controls.type.value?.trim(),
        name: g.controls.name.value?.trim(),
        portion: g.controls.portion.value?.trim(),
        note: g.controls.note.value?.trim(),
      });
    }

    return part;
  }

  private getAttachmentGroup(attachment?: Attachment): FormGroup {
    return this._formBuilder.group({
      type: this._formBuilder.control(attachment?.type, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      name: this._formBuilder.control(attachment?.name, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      portion: this._formBuilder.control(
        attachment?.portion,
        Validators.maxLength(50)
      ),
      note: this._formBuilder.control(
        attachment?.note,
        Validators.maxLength(500)
      ),
    });
  }

  public addAttachment(attachment?: Attachment): void {
    this.attachments.push(this.getAttachmentGroup(attachment));
    this.form.markAsDirty();
  }

  public removeAttachment(index: number): void {
    this.attachments.removeAt(index);
    this.form.markAsDirty();
  }

  public moveAttachmentUp(index: number): void {
    if (index < 1) {
      return;
    }
    const attachment = this.attachments.controls[index];
    this.attachments.removeAt(index);
    this.attachments.insert(index - 1, attachment);
    this.form.markAsDirty();
  }

  public moveAttachmentDown(index: number): void {
    if (index + 1 >= this.attachments.length) {
      return;
    }
    const attachment = this.attachments.controls[index];
    this.attachments.removeAt(index);
    this.attachments.insert(index + 1, attachment);
    this.form.markAsDirty();
  }
}
