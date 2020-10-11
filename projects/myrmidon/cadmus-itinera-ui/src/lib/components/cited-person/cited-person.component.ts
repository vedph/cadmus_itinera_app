import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  CitedPerson,
  DecoratedId,
  PersonName,
} from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cadmus-cited-person',
  templateUrl: './cited-person.component.html',
  styleUrls: ['./cited-person.component.css'],
})
export class CitedPersonComponent {
  private _person: CitedPerson;
  private _name: PersonName;

  public ids: DecoratedId[];

  @Input()
  public get person(): CitedPerson {
    return this._person;
  }
  public set person(value: CitedPerson) {
    this._person = value;
    this.setModel(this._person);
  }

  /**
   * The optional thesaurus language entries.
   */
  @Input()
  public langEntries: ThesaurusEntry[];
  /**
   * The optional thesaurus name's tag entries.
   */
  @Input()
  public tagEntries: ThesaurusEntry[];
  /**
   * The optional thesaurus name part's type entries.
   */
  @Input()
  public typeEntries: ThesaurusEntry[];

  /**
   * The optional IDs tag entries.
   */
  @Input()
  public idTagEntries: ThesaurusEntry[];

  @Output()
  public personChage: EventEmitter<CitedPerson>;

  @Output()
  public editorClose: EventEmitter<any>;

  public name$: BehaviorSubject<PersonName>;

  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    // events
    this.personChage = new EventEmitter<CitedPerson>();
    this.editorClose = new EventEmitter<any>();

    // form
    this.name$ = new BehaviorSubject<PersonName>({
      language: 'ita',
      parts: [],
    });

    // this is the parent form for both name and ids
    this.form = formBuilder.group({});
  }

  private setModel(model: CitedPerson): void {
    this.name$.next(model?.name);
    this.ids = model?.ids;

    if (!model) {
      this.form.reset();
    } else {
      this.form.markAsPristine();
    }
  }

  private getModel(): CitedPerson {
    return {
      name: this._name,
      ids: this.ids,
    };
  }

  public onNameChange(name: PersonName): void {
    this._name = name;
  }

  public onIdsChange(ids: DecoratedId[]): void {
    this.ids = ids;
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    const model = this.getModel();
    if (model.name?.language && model.name?.parts?.length > 0) {
      this.personChage.emit(model);
    }
  }
}
