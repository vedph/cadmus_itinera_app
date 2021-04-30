import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  DocReference,
  HistoricalDateModel,
  ThesaurusEntry,
} from '@myrmidon/cadmus-core';
import { BioEvent, DecoratedId } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-bio-event',
  templateUrl: './bio-event.component.html',
  styleUrls: ['./bio-event.component.css'],
})
export class BioEventComponent implements OnInit, AfterViewInit {
  private _event : BioEvent | undefined;

  @Input()
  public get event() : BioEvent | undefined {
    return this._event;
  }
  public set event(value : BioEvent | undefined) {
    this._event = value;
    this.updateForm(value);
  }

  @Input()
  public typeEntries: ThesaurusEntry[] | undefined;
  @Input()
  public partTagEntries: ThesaurusEntry[] | undefined;
  @Input()
  public docRefTagEntries: ThesaurusEntry[] | undefined;

  @Output()
  public eventChange: EventEmitter<BioEvent>;

  @Output()
  public editorClose: EventEmitter<any>;

  @ViewChild('dsceditor') dscEditor: any;

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  public type: FormControl;
  public rank: FormControl;
  public work: FormControl;
  public lost: FormControl;
  public places: FormControl;
  public description: FormControl;
  public ids: FormControl;
  public sources: FormControl;
  public form: FormGroup;

  public initialIds: string[] | undefined;
  public initialSources: DocReference[];

  public date: HistoricalDateModel | undefined;

  public participants: DecoratedId[] | undefined;
  public initialParticipants: DecoratedId[];

  constructor(formBuilder: FormBuilder) {
    this.initialIds = [];
    this.initialSources = [];
    this.initialParticipants = [];
    // events
    this.eventChange = new EventEmitter<BioEvent>();
    this.editorClose = new EventEmitter();
    // form
    this.type = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.rank = formBuilder.control(0);
    this.work = formBuilder.control(null, Validators.maxLength(100));
    this.lost = formBuilder.control(false);
    this.places = formBuilder.control(null, Validators.maxLength(500));
    this.description = formBuilder.control(null, Validators.maxLength(500));
    this.ids = formBuilder.control([]);
    this.sources = formBuilder.control([]);
    this.form = formBuilder.group({
      type: this.type,
      rank: this.rank,
      work: this.work,
      lost: this.lost,
      places: this.places,
      description: this.description,
      ids: this.ids,
      sources: this.sources,
    });
  }

  public ngOnInit(): void {
    if (this._event) {
      this.updateForm(this._event);
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.dscEditor._editor.layout();
    }, 1000);
  }

  public onTabIndexChanged(index: number): void {
    // HACK
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    // https://stackoverflow.com/questions/37412950/ngx-monaco-editor-unable-to-set-layout-size-when-container-changes-using-tab
    if (index === 0) {
      setTimeout(() => {
        this.dscEditor._editor.layout();
      }, 150);
    }
  }

  private updateForm(model: BioEvent): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.initialIds = model.externalIds || [];
    this.initialSources = model.sources || [];
    this.initialParticipants = model.participants || [];
    this.date = model.date;

    this.type.setValue(model.type);
    this.rank.setValue(model.rank);
    this.work.setValue(model.work);
    this.lost.setValue(model.isWorkLost);
    this.places.setValue(model.places?.join('; '));
    this.description.setValue(model.description);
    this.form.markAsPristine();
  }

  private parsePlaces(text: string | null): string[] | undefined {
    if (!text) {
      return undefined;
    }
    const places: string[] = [];
    for (let place of text.split(';')) {
      place = place.trim();
      if (!places.find((p) => p === place)) {
        places.push(place);
      }
    }
    return places.length ? places : undefined;
  }

  private getModel(): BioEvent {
    return {
      type: this.type.value?.trim(),
      date: this.date,
      places: this.parsePlaces(this.places.value),
      description: this.description.value?.trim(),
      sources: this.sources.value?.length ? this.sources.value : undefined,
      participants: this.participants?.length ? this.participants : undefined,
      work: this.work.value?.trim(),
      rank: this.rank.value,
      isWorkLost: this.lost.value,
      externalIds: this.ids.value?.length ? this.ids.value : undefined,
    };
  }

  public onIdsChanged(ids: string[]): void {
    this.ids.setValue(ids);
    this.form.markAsDirty();
  }

  public onSourcesChanged(sources: DocReference[]): void {
    this.sources.setValue(sources);
    this.form.markAsDirty();
  }

  public onParticipantsChange(participants: DecoratedId[]): void {
    this.participants = participants;
    this.form.markAsDirty();
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.eventChange.emit(this.getModel());
  }
}
