import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'itinera-bio-event',
  templateUrl: './bio-event.component.html',
  styleUrls: ['./bio-event.component.css'],
})
export class BioEventComponent implements OnInit {
  private _ids: string[];
  private _sources: DocReference[];

  @Input()
  public model: BioEvent;

  @Input()
  public typeEntries: ThesaurusEntry[];
  @Input()
  public partTagEntries: ThesaurusEntry[];

  @Output()
  public modelChange: EventEmitter<BioEvent>;

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
  public form: FormGroup;

  public date: HistoricalDateModel;
  public participants: DecoratedId[];

  public ids$: BehaviorSubject<string[]>;
  public sources$: BehaviorSubject<DocReference[]>;

  constructor(formBuilder: FormBuilder) {
    this._ids = [];
    this._sources = [];
    this.participants = [];
    this.ids$ = new BehaviorSubject<string[]>([]);
    this.sources$ = new BehaviorSubject<DocReference[]>([]);
    // events
    this.modelChange = new EventEmitter<BioEvent>();
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
    this.form = formBuilder.group({
      type: this.type,
      rank: this.rank,
      work: this.work,
      lost: this.lost,
      places: this.places,
      description: this.description,
    });
  }

  ngOnInit(): void {
    this.updateForm(this.model);
  }

  public onTabIndexChanged(index: number): void {
    // HACK
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    // https://stackoverflow.com/questions/37412950/ngx-monaco-editor-unable-to-set-layout-size-when-container-changes-using-tab
    if (index === 0) {
      setTimeout(() => {
        this.dscEditor._editor.layout();
      }, 100);
    }
  }

  private updateForm(model: BioEvent): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.ids$.next(model.externalIds || []);
    this.sources$.next(model.sources || []);
    this.participants = model.participants || [];
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
      sources: this._sources?.length ? this._sources : undefined,
      participants: this.participants?.length ? this.participants : undefined,
      work: this.work.value?.trim(),
      rank: this.rank.value,
      isWorkLost: this.lost.value,
      externalIds: this._ids,
    };
  }

  public onIdsChanged(ids: string[]): void {
    this._ids = ids;
    this.form.markAsDirty();
  }

  public onSourcesChanged(sources: DocReference[]): void {
    this._sources = sources;
    this.form.markAsDirty();
  }

  public onParticipantsChanged(participants: DecoratedId[]): void {
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
    this.modelChange.emit(this.getModel());
  }
}
