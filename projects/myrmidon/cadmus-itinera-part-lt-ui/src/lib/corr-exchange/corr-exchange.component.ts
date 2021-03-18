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
  public attachments: FormArray;
  public hasCt: FormControl;
  public form: FormGroup;

  public participants: DecoratedId[];
  public participants$: BehaviorSubject<DecoratedId[]>;
  public chronotopes: Chronotope[] | undefined;
  public sources: DocReference[];
  public sources$: BehaviorSubject<DocReference[]>;

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
    this.attachments = _formBuilder.array([]);
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
    this.attachments.clear();
    for (const a of model.attachments || []) {
      this.addAttachment(a);
    }
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
    };

    if (this.attachments.length) {
      model.attachments = [];
      for (let i = 0; i < this.attachments.length; i++) {
        const g = this.attachments.controls[i] as FormGroup;
        model.attachments.push({
          type: g.controls.type.value?.trim(),
          name: g.controls.name.value?.trim(),
          portion: g.controls.portion.value?.trim(),
          note: g.controls.note.value?.trim(),
        });
      }
    }

    return model;
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
  }

  public removeAttachment(index: number): void {
    this.attachments.removeAt(index);
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
