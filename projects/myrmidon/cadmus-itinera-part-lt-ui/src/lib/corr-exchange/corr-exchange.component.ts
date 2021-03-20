import { moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DocReference, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  Chronotope,
  CorrExchange,
  DecoratedId,
  Attachment,
} from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'itinera-corr-exchange',
  templateUrl: './corr-exchange.component.html',
  styleUrls: ['./corr-exchange.component.css'],
})
export class CorrExchangeComponent implements OnInit, AfterViewInit, OnDestroy {
  private _nameSubscription: Subscription;

  @ViewChildren('name') nameQueryList: QueryList<any>;

  @Input()
  public model: CorrExchange;

  // doc-reference-tags
  @Input()
  public tagEntries: ThesaurusEntry[] | undefined;

  // chronotope-tags
  @Input()
  public ctTagEntries: ThesaurusEntry[] | undefined;

  // epist-attachment-types
  @Input()
  public typeEntries: ThesaurusEntry[] | undefined;

  @Output()
  public modelChange: EventEmitter<CorrExchange>;

  @Output()
  public editorClose: EventEmitter<any>;

  public dubious: FormControl;
  public indirect: FormControl;
  public participant: FormControl;
  public attachments: FormControl;
  public hasCt: FormControl;
  public form: FormGroup;

  public participants: DecoratedId[];
  public participants$: BehaviorSubject<DecoratedId[]>;
  public chronotopes: Chronotope[] | undefined;
  public sources: DocReference[];
  public sources$: BehaviorSubject<DocReference[]>;
  public editedAttachment: Attachment | undefined;

  constructor(private _formBuilder: FormBuilder) {
    this.participants = [];
    this.participants$ = new BehaviorSubject<DecoratedId[]>([]);
    this.sources = [];
    this.sources$ = new BehaviorSubject<DocReference[]>([]);
    // events
    this.modelChange = new EventEmitter<CorrExchange>();
    this.editorClose = new EventEmitter();
    // form
    this.dubious = _formBuilder.control(false);
    this.indirect = _formBuilder.control(false);
    this.participant = _formBuilder.control(false);
    this.attachments = _formBuilder.control([]);
    this.hasCt = _formBuilder.control(false, Validators.requiredTrue);
    this.form = _formBuilder.group({
      dubious: this.dubious,
      indirect: this.indirect,
      participant: this.participant,
      attachments: this.attachments,
      // used to validate: from/to must exist
      hasCt: this.hasCt,
    });
  }

  ngOnInit(): void {
    this.updateForm(this.model);
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

  private updateForm(model: CorrExchange): void {
    if (!model) {
      this.participants$.next([]);
      this.sources$.next([]);
      this.chronotopes = undefined;
      this.form.reset();
      return;
    }
    this.participants$.next(model.participants || []);
    this.sources$.next(model.sources || []);
    this.chronotopes = model.chronotopes;
    this.dubious.setValue(model.isDubious);
    this.indirect.setValue(model.isIndirect);
    this.participant.setValue(model.isFromParticipant);
    this.attachments.setValue(model.attachments || []);
    this.form.markAsPristine();
  }

  private getModel(): CorrExchange {
    const model: CorrExchange = {
      isDubious: this.dubious.value,
      isIndirect: this.indirect.value,
      isFromParticipant: this.participant.value,
      chronotopes: this.chronotopes?.length ? this.chronotopes : undefined,
      participants: this.participants?.length ? this.participants : undefined,
      sources: this.sources?.length ? this.sources : undefined,
      attachments: this.attachments.value.length
        ? this.attachments.value
        : undefined,
    };

    return model;
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
    const i = this.attachments.value.indexOf(this.editedAttachment);
    if (i === -1) {
      this.attachments.value.push(attachment);
    } else {
      this.attachments.value[i] = attachment;
    }
    this.editedAttachment = undefined;
  }

  public onAttachmentEditorClose(): void {
    this.editedAttachment = undefined;
  }

  public removeAttachment(index: number): void {
    this.attachments.value.splice(index, 1);
  }

  public moveAttachmentUp(index: number): void {
    if (index < 1) {
      return;
    }
    moveItemInArray(this.attachments.value, index, index - 1);
    this.form.markAsDirty();
  }

  public moveAttachmentDown(index: number): void {
    if (index + 1 >= this.attachments.value.length) {
      return;
    }
    moveItemInArray(this.attachments.value, index, index + 1);
    this.form.markAsDirty();
  }

  public getAttachmentTypeName(type: string): string {
    const entry = this.typeEntries?.find((e) => e.id === type);
    return entry ? entry.value : type;
  }

  public onParticipantsChange(participants: DecoratedId[]): void {
    this.participants = participants;
  }

  public onSourcesChange(sources: DocReference[]): void {
    this.sources = sources;
  }

  public onChronotopesChange(chronotopes: Chronotope[] | undefined): void {
    this.chronotopes = chronotopes;
    this.form.markAsDirty();
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
