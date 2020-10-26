import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { PersonEventsPart, PERSON_EVENTS_PART_TYPEID } from '../person-events-part';

@Component({
  selector: 'cadmus-person-events-part',
  templateUrl: './person-events-part.component.html',
  styleUrls: ['./person-events-part.component.css'],
})
export class PersonEventsPartComponent
  extends ModelEditorComponentBase<PersonEventsPart>
  implements OnInit {
  // TODO form controls (form: FormGroup is inherited)

  // TODO thesauri entries, e.g.:
  // public tagEntries: ThesaurusEntry[];

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // form
    // TODO build controls and set this.form
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: PersonEventsPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    // TODO set controls values from model
    this.form.markAsPristine();
  }

  protected onModelSet(model: PersonEventsPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    // TODO set entries from this.thesauri, e.g.:
    // const key = 'note-tags';
    // if (this.thesauri && this.thesauri[key]) {
    // this.tagEntries = this.thesauri[key].entries;
    // } else {
    //   this.tagEntries = null;
    // }
    // if not using any thesauri, just remove this function
  }

  protected getModelFromForm(): PersonEventsPart {
    let part = this.getModelFromJson();
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
        events: []
      };
    }
    // TODO set part.properties from form controls
    return part;
  }
}
