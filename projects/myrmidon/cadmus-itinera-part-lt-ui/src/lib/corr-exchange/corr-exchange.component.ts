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
  private _exchange: CorrExchange | undefined;

  @ViewChildren('name') nameQueryList: QueryList<any>;

  @Input()
  public get exchange(): CorrExchange | undefined {
    return this._exchange;
  }
  public set exchange(value: CorrExchange | undefined) {
    this._exchange = value;
    this.updateForm(value);
  }

  // doc-reference-tags
  @Input()
  public tagEntries: ThesaurusEntry[] | undefined;

  // chronotope-tags
  @Input()
  public ctTagEntries: ThesaurusEntry[] | undefined;

  // epist-attachment-types
  @Input()
  public attTypeEntries: ThesaurusEntry[] | undefined;

  @Output()
  public exchangeChange: EventEmitter<CorrExchange>;

  @Output()
  public editorClose: EventEmitter<any>;

  public dubious: FormControl;
  public indirect: FormControl;
  public participant: FormControl;
  public attachments: FormControl;
  public hasCt: FormControl;
  public sources: FormControl;
  public form: FormGroup;

  public participants: DecoratedId[];
  public participants$: BehaviorSubject<DecoratedId[]>;
  public chronotopes: Chronotope[] | undefined;
  public initialSources: DocReference[];

  constructor(formBuilder: FormBuilder) {
    this.participants = [];
    this.participants$ = new BehaviorSubject<DecoratedId[]>([]);
    this.initialSources = [];
    // events
    this.exchangeChange = new EventEmitter<CorrExchange>();
    this.editorClose = new EventEmitter();
    // form
    this.dubious = formBuilder.control(false);
    this.indirect = formBuilder.control(false);
    this.participant = formBuilder.control(false);
    this.attachments = formBuilder.control([]);
    this.hasCt = formBuilder.control(false, Validators.requiredTrue);
    this.sources = formBuilder.control([]);
    this.form = formBuilder.group({
      dubious: this.dubious,
      indirect: this.indirect,
      participant: this.participant,
      attachments: this.attachments,
      hasCt: this.hasCt, // used to validate: from/to must exist
      sources: this.sources,
    });
  }

  ngOnInit(): void {
    if (this._exchange) {
      this.updateForm(this._exchange);
    }
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
      this.initialSources = [];
      this.chronotopes = undefined;
      this.form.reset();
      return;
    }
    this.participants$.next(model.participants || []);
    this.initialSources = model.sources || [];
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
      sources: this.sources.value?.length ? this.sources.value : undefined,
      attachments: this.attachments.value.length
        ? this.attachments.value
        : undefined,
    };

    return model;
  }

  public onAttachmentsChange(attachments: Attachment[] | undefined): void {
    this.attachments.setValue(attachments);
    this.form.markAsDirty();
  }

  public onParticipantsChange(participants: DecoratedId[]): void {
    this.participants = participants;
    this.form.markAsDirty();
  }

  public onSourcesChange(sources: DocReference[]): void {
    this.sources.setValue(sources);
    this.form.markAsDirty();
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
    this.exchangeChange.emit(this.getModel());
  }
}
