import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, DocReference, ThesaurusEntry } from '@myrmidon/cadmus-core';

import { PersonHandPart, PERSON_HAND_PART_TYPEID } from '../person-hand-part';
import { BehaviorSubject } from 'rxjs';

/**
 * PersonHand editor component.
 * Thesauri: ms-hand-jobs, doc-reference-tags (all optional).
 */
@Component({
  selector: 'itinera-person-hand-part',
  templateUrl: './person-hand-part.component.html',
  styleUrls: ['./person-hand-part.component.css'],
})
export class PersonHandPartComponent
  extends ModelEditorComponentBase<PersonHandPart>
  implements OnInit {
  public personId: FormControl;
  public job: FormControl;

  public others$: BehaviorSubject<DocReference[]>;
  public others: DocReference[];

  public handJobEntries: ThesaurusEntry[];
  public docRefTagEntries: ThesaurusEntry[];

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    this.others$ = new BehaviorSubject<DocReference[]>([]);
    this.others = [];
    // form
    this.personId = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.job = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.form = formBuilder.group({
      personId: this.personId,
      job: this.job,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: PersonHandPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.personId.setValue(model.personId);
    this.job.setValue(model.job);
    this.others = model.others || [];

    this.form.markAsPristine();
  }

  protected onModelSet(model: PersonHandPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'ms-hand-jobs';
    if (this.thesauri && this.thesauri[key]) {
      this.handJobEntries = this.thesauri[key].entries;
    } else {
      this.handJobEntries = null;
    }

    key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.docRefTagEntries = this.thesauri[key].entries;
    } else {
      this.docRefTagEntries = null;
    }
  }

  protected getModelFromForm(): PersonHandPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        personId: null,
        itemId: this.itemId,
        id: null,
        typeId: PERSON_HAND_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        type: null,
        job: null,
      };
    }
    part.personId = this.personId.value?.trim();
    part.job = this.job.value?.trim();
    part.others = this.others.length? this.others : undefined;
    return part;
  }

  public onOthersChange(model: DocReference[]): void {
    this.others = model;
  }
}
