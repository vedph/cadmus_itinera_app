import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import {
  deepCopy,
  HistoricalDate,
  HistoricalDateModel,
  ThesaurusEntry,
} from '@myrmidon/cadmus-core';
import {
  PersonEventsPart,
  PERSON_EVENTS_PART_TYPEID,
} from '../person-events-part';
import { BioEvent } from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * Person events part editor.
 * Thesauri: bio-event-types, event-participant-tags, doc-reference-tags
 * (all optional).
 */
@Component({
  selector: 'itinera-person-events-part',
  templateUrl: './person-events-part.component.html',
  styleUrls: ['./person-events-part.component.css'],
})
export class PersonEventsPartComponent
  extends ModelEditorComponentBase<PersonEventsPart>
  implements OnInit {
  private _editedIndex: number;

  public tabIndex: number;
  public editedEvent: BioEvent;

  public typeEntries: ThesaurusEntry[];
  public partTagEntries: ThesaurusEntry[];
  public docRefTagEntries: ThesaurusEntry[];

  public events: BioEvent[];

  public count: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    this.events = [];
    // form
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      count: this.count,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: PersonEventsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.count.setValue(model.events?.length || 0);
    this.events = model.events || [];
    this.form.markAsPristine();
  }

  protected onModelSet(model: PersonEventsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'bio-event-types';
    if (this.thesauri && this.thesauri[key]) {
      this.typeEntries = this.thesauri[key].entries;
    } else {
      this.typeEntries = null;
    }

    key = 'event-participant-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.partTagEntries = this.thesauri[key].entries;
    } else {
      this.partTagEntries = null;
    }

    key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.docRefTagEntries = this.thesauri[key].entries;
    } else {
      this.docRefTagEntries = null;
    }
  }

  protected getModelFromForm(): PersonEventsPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: PERSON_EVENTS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        events: [],
      };
    }
    part.events = this.events;
    return part;
  }

  public addEvent(): void {
    const event: BioEvent = {
      type: null,
      sources: null,
    };
    this.events = [...this.events, event];
    this.count.setValue(this.events.length);
    this.count.markAsDirty();
    this.editEvent(this.events.length - 1);
  }

  public editEvent(index: number): void {
    if (index < 0) {
      this._editedIndex = -1;
      this.tabIndex = 0;
      this.editedEvent = null;
    } else {
      this._editedIndex = index;
      this.editedEvent = this.events[index];
      setTimeout(() => {
        this.tabIndex = 1;
      }, 300);
    }
  }

  public onEventSaved(item: BioEvent): void {
    this.events = this.events.map((s, i) =>
      i === this._editedIndex ? item : s
    );
    this.editEvent(-1);
    this.count.markAsDirty();
  }

  public onEventClosed(): void {
    this.editEvent(-1);
  }

  public deleteEvent(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete event?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const items = [...this.events];
          items.splice(index, 1);
          this.events = items;
          this.count.setValue(this.events.length);
          this.count.markAsDirty();
        }
      });
  }

  public moveEventUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.events[index];
    const items = [...this.events];
    items.splice(index, 1);
    items.splice(index - 1, 0, item);
    this.events = items;
  }

  public moveEventDown(index: number): void {
    if (index + 1 >= this.events.length) {
      return;
    }
    const item = this.events[index];
    const items = [...this.events];
    items.splice(index, 1);
    items.splice(index + 1, 0, item);
    this.events = items;
  }

  public dateToString(date: HistoricalDateModel | null): string {
    return date ? new HistoricalDate(date).toString() : '';
  }

  public placesToString(places: string[] | null): string {
    return places ? places.join('; ') : '';
  }
}
