import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { Attachment } from '@myrmidon/cadmus-itinera-core';
import { DialogService } from '@myrmidon/cadmus-ui';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cadmus-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css'],
})
export class AttachmentsComponent implements OnInit {
  private _attachments: Attachment[] | undefined;

  @Input()
  public get attachments(): Attachment[] | undefined {
    return this._attachments;
  }
  public set attachments(value: Attachment[] | undefined) {
    this._attachments = value;
    this.editedAttachment = undefined;
  }

  @Input()
  public attTypeEntries: ThesaurusEntry[] | undefined;

  @Output()
  public attachmentsChange: EventEmitter<Attachment[] | undefined>;

  public editedAttachment: Attachment | undefined;

  constructor(private _dialogService: DialogService) {
    this.attachmentsChange = new EventEmitter<Attachment[] | undefined>();
  }

  ngOnInit(): void {}

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
    } else {
      this.attachments[i] = attachment;
    }
    this.editedAttachment = undefined;
    this.attachmentsChange.emit(this.attachments);
  }

  public onAttachmentEditorClose(): void {
    this.editedAttachment = undefined;
  }

  public removeAttachment(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete attachment?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.editedAttachment = undefined;
          this.attachments.splice(index, 1);
          this.attachmentsChange.emit(this.attachments);
        }
      });
  }

  public moveAttachmentUp(index: number): void {
    if (index < 1) {
      return;
    }
    this.editedAttachment = undefined;
    const attachment = this.attachments[index];
    this.attachments.splice(index, 1);
    this.attachments.splice(index - 1, 0, attachment);
    this.attachmentsChange.emit(this.attachments);
  }

  public moveAttachmentDown(index: number): void {
    if (index + 1 >= this.attachments.length) {
      return;
    }
    this.editedAttachment = undefined;
    const attachment = this.attachments[index];
    this.attachments.splice(index, 1);
    this.attachments.splice(index + 1, 0, attachment);
    this.attachmentsChange.emit(this.attachments);
  }

  public getAttachmentTypeName(type: string): string {
    const entry = this.attTypeEntries?.find((e) => e.id === type);
    return entry ? entry.value : type;
  }
}
