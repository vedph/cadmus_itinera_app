import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry, DocReference } from '@myrmidon/cadmus-core';
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
export class CitedPersonComponent implements OnInit {
  private _name: PersonName;
  public sources: DocReference[];
  public ids: DecoratedId[];

  @Input()
  public person: CitedPerson;

  /**
   * The optional thesaurus language entries.
   */
  @Input()
  public langEntries: ThesaurusEntry[];
  /**
   * The optional thesaurus name's tag entries.
   */
  @Input()
  public nameTagEntries: ThesaurusEntry[];
  /**
   * The optional thesaurus name part's type entries.
   */
  @Input()
  public nameTypeEntries: ThesaurusEntry[];
  /**
   * The optional IDs tag entries.
   */
  @Input()
  public idTagEntries: ThesaurusEntry[];

  @Output()
  public personChange: EventEmitter<CitedPerson>;

  @Output()
  public editorClose: EventEmitter<any>;

  public name$: BehaviorSubject<PersonName>;
  public sources$: BehaviorSubject<DocReference[]>;

  public hasName: FormControl;
  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.name$ = new BehaviorSubject<PersonName>({
      language: 'ita',
      parts: [],
    });
    this.sources$ = new BehaviorSubject<DocReference[]>([]);

    // events
    this.personChange = new EventEmitter<CitedPerson>();
    this.editorClose = new EventEmitter<any>();

    // form
    this.hasName = formBuilder.control(false, Validators.requiredTrue);

    // this is the parent form for both name and ids
    this.form = formBuilder.group({
      hasName: this.hasName,
    });
  }

  public ngOnInit(): void {
    this.updateForm(this.person);
  }

  private updateHasName(name: PersonName | null): void {
    this.hasName.setValue(
      name?.parts?.length > 0 && name?.language ? true : false
    );
  }

  private updateForm(model: CitedPerson): void {
    console.log('updateForm: ' + (model?.name? JSON.stringify(model.name) : 'n/a'));
    this.name$.next(model?.name);
    this.ids = model?.ids || [];
    this.sources$.next(model?.sources || []);

    if (!model) {
      this.hasName.setValue(false);
      this.form.reset();
    } else {
      this.updateHasName(model.name);
      this.form.markAsPristine();
    }
  }

  private getModel(): CitedPerson {
    console.log('getModel: ' + (this._name? JSON.stringify(this._name) : 'n/a'));
    return {
      name: this._name,
      ids: this.ids?.length ? this.ids : undefined,
      sources: this.sources?.length ? this.sources : undefined,
    };
  }

  public onNameChange(name: PersonName): void {
    console.log('onNameChange: ' + (name? JSON.stringify(name) : 'n/a'));
    this._name = name;
    this.form.markAsDirty();
    this.updateHasName(name);
  }

  public onIdsChange(ids: DecoratedId[]): void {
    this.ids = ids;
    this.form.markAsDirty();
  }

  public onSourcesChange(sources: DocReference[]): void {
    console.log('onSourcesChange: ' + (name? JSON.stringify(name) : 'n/a'));
    this.sources = sources;
    this.form.markAsDirty();
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    const model = this.getModel();
    this.personChange.emit(model);
  }
}
