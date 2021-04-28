import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry, CadmusValidators } from '@myrmidon/cadmus-core';

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

  public attachments: FormControl;

  // epist-attachment-types
  public typeEntries: ThesaurusEntry[] | undefined;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // form
    this.attachments = formBuilder.control([],
      CadmusValidators.strictMinLengthValidator(1));
    this.form = formBuilder.group({
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
    this.attachments.setValue(model.attachments || []);
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
      this.typeEntries = undefined;
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
    part.attachments = this.attachments.value;
    return part;
  }

  public onAttachmentsChange(attachments: Attachment[] | undefined): void {
    this.attachments.setValue(attachments);
    this.form.markAsDirty();
  }
}
