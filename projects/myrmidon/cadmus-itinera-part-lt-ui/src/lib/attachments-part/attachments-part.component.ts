import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';

import { AttachmentsPart, ATTACHMENTS_PART_TYPEID } from '../attachments-part';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Attachment } from '@myrmidon/cadmus-itinera-core';
import { moveItemInArray } from '@angular/cdk/drag-drop';

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

  public attachments: Attachment[];
  public count: FormControl;

  // epist-attachment-types
  public typeEntries: ThesaurusEntry[];

  public editedAttachment: Attachment | undefined;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // form
    this.attachments = [];
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
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
    this.attachments = [];
    if (!model) {
      this.form.reset();
      return;
    }
    this.attachments = model.attachments || [];
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
    part.attachments = this.attachments;
    return part;
  }

  public editAttachment(attachment: Attachment): void {
    this.editedAttachment = attachment;
  }

  public addAttachment(): void {
    this.editAttachment({
      type: null,
      name: null,
    });
  }

  public onAttachmentChange(attachment: Attachment): void {
    if (!this.editedAttachment) {
      return;
    }
    const i = this.attachments.indexOf(this.editedAttachment);
    if (i === -1) {
      this.attachments.push(attachment);
      this.count.setValue(this.attachments.length);
    } else {
      this.attachments[i] = attachment;
    }
    this.editedAttachment = undefined;
  }

  public onAttachmentEditorClose(): void {
    this.editedAttachment = undefined;
  }

  public removeAttachment(index: number): void {
    this.attachments.splice(index, 1);
    this.count.setValue(this.attachments.length);
    this.form.markAsDirty();
  }

  public moveAttachmentUp(index: number): void {
    if (index < 1) {
      return;
    }
    moveItemInArray(this.attachments, index, index - 1);
    this.form.markAsDirty();
  }

  public moveAttachmentDown(index: number): void {
    if (index + 1 >= this.attachments.length) {
      return;
    }
    moveItemInArray(this.attachments, index, index + 1);
    this.form.markAsDirty();
  }

  public getAttachmentTypeName(type: string): string {
    const entry = this.typeEntries?.find((e) => e.id === type);
    return entry ? entry.value : type;
  }
}
