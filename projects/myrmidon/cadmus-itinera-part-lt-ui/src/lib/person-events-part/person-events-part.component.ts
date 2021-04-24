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
  public editedEvent: BioEvent | undefined;

  public typeEntries: ThesaurusEntry[] | undefined;
  public partTagEntries: ThesaurusEntry[] | undefined;
  public docRefTagEntries: ThesaurusEntry[] | undefined;

  public events: FormControl;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {
    super(authService);
    this.tabIndex = 0;
    this._editedIndex = -1;
    // form
    this.events = formBuilder.control([], Validators.required);
    this.form = formBuilder.group({
      events: this.events,
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
    this.events.setValue(model.events || []);
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
      this.typeEntries = undefined;
    }

    key = 'event-participant-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.partTagEntries = this.thesauri[key].entries;
    } else {
      this.partTagEntries = undefined;
    }

    key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.docRefTagEntries = this.thesauri[key].entries;
    } else {
      this.docRefTagEntries = undefined;
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
    part.events = this.events.value;
    return part;
  }

  private closeEventEditor(): void {
    this._editedIndex = -1;
    this.tabIndex = 0;
    this.editedEvent = null;
  }

  public addEvent(): void {
    this._editedIndex = -1;
    this.editedEvent = {
      type: null,
      sources: null,
    };
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public editEvent(index: number): void {
    this._editedIndex = index;
    this.editedEvent = this.events.value[index];
    setTimeout(() => {
      this.tabIndex = 1;
    }, 300);
  }

  public onEventChange(event: BioEvent): void {
    if (this._editedIndex === -1) {
      this.events.value.push(event);
    } else {
      this.events.value.splice(this._editedIndex, 1, event);
    }
    this.closeEventEditor();
    this.form.markAsDirty();
  }

  public onEventClose(): void {
    this.closeEventEditor();
  }

  public deleteEvent(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete event?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.events.value.splice(index, 1);
          this.form.markAsDirty();
        }
      });
  }

  public moveEventUp(index: number): void {
    if (index < 1) {
      return;
    }
    const event = this.events.value[index];
    const events = [...this.events.value];
    events.splice(index, 1);
    events.splice(index - 1, 0, event);
    this.events.setValue(events);
  }

  public moveEventDown(index: number): void {
    if (index + 1 >= this.events.value.length) {
      return;
    }
    const event = this.events.value[index];
    const events = [...this.events.value];
    events.splice(index, 1);
    events.splice(index + 1, 0, event);
    this.events.setValue(events);
  }

  public dateToString(date: HistoricalDateModel | null): string {
    return date ? new HistoricalDate(date).toString() : '';
  }

  public placesToString(places: string[] | null): string {
    return places ? places.join('; ') : '';
  }
}
