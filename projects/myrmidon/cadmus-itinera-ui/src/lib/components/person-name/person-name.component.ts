import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { PersonName, PersonNamePart } from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * Person name in-place editor.
 */
@Component({
  selector: 'cadmus-person-name',
  templateUrl: './person-name.component.html',
  styleUrls: ['./person-name.component.css'],
})
export class PersonNameComponent implements OnInit, AfterViewInit, OnDestroy {
  private _modelSub: Subscription;
  private _modelSubject: BehaviorSubject<PersonName>;
  private _partValueSub: Subscription;

  @ViewChildren('partValue') partValues: QueryList<any>;

  /**
   * The optional parent form this component should attach to.
   * Set this when the form in this component should contribute
   * to the state of a parent form in the consumer control.
   */
  @Input()
  public parentForm: FormGroup;
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
   * The person name edited by this component, wrapped
   * in a subject stream. This component updates when
   * the stream updates (unless no changes occurred).
   */
  @Input()
  public get model$(): BehaviorSubject<PersonName> {
    return this._modelSubject;
  }
  public set model$(value: BehaviorSubject<PersonName>) {
    this._modelSubject = value;

    // unsubscribe the previous observable if any
    if (this._modelSub) {
      this._modelSub.unsubscribe();
    }
    // subscribe to the new observable
    if (this._modelSubject) {
      this._modelSub = this._modelSubject.subscribe((m) => {
        this.setModel(m);
      });
    }
  }

  /**
   * Event emitted whenever the user has changed the model.
   * The consumer component should subscribe to this to get
   * the updated model.
   */
  @Output()
  public modelChange: EventEmitter<PersonName>;

  public form: FormGroup;
  public language: FormControl;
  public tag: FormControl;
  public parts: FormArray;

  constructor(private _formBuilder: FormBuilder) {
    // events
    this.modelChange = new EventEmitter<PersonName>();
  }

  ngOnInit(): void {
    // create this form
    this.language = this._formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.tag = this._formBuilder.control(null, Validators.maxLength(50));
    this.parts = this._formBuilder.array([], Validators.required);
    this.form = this._formBuilder.group({
      language: this.language,
      tag: this.tag,
      parts: this.parts,
    });

    // add it as a child form to the parent, if any.
    // This propagates this form's state into it.
    if (this.parentForm) {
      this.parentForm.addControl('personName', this.form);
    }

    // once we are initialized, set the model to the current
    // value, because if it was set meantime it would be lost
    this.setModel(this._modelSubject?.value);

    // react on this form changes
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((x, y) => {
          return this.areModelsEqual(x, y);
        })
      )
      .subscribe((_) => {
        const m = this.getModel();
        if (m) {
          this.modelChange.emit(m);
        }
      });
  }

  public ngAfterViewInit(): void {
    this._partValueSub = this.partValues.changes
      .pipe(debounceTime(300))
      .subscribe((_) => {
        if (this.partValues.length > 0) {
          this.partValues.last.nativeElement.focus();
        }
      });
  }

  public ngOnDestroy(): void {
    this._partValueSub.unsubscribe();
  }

  private areModelsEqual(x: PersonName, y: PersonName): boolean {
    if ((!x && y) || (!y && x)) {
      return false;
    }
    if (!x && !y) {
      return true;
    }
    if (x.language !== y.language || x.tag !== y.tag) {
      return false;
    }
    if (x.parts?.length !== y.parts?.length) {
      return false;
    }
    for (let i = 0; i < x.parts.length; i++) {
      if (
        x.parts[i]?.type !== y.parts[i]?.type ||
        x.parts[i]?.value !== y.parts[i]?.value
      ) {
        return false;
      }
    }
    return true;
  }

  private getPartGroup(part?: PersonNamePart): FormGroup {
    return this._formBuilder.group({
      type: this._formBuilder.control(part?.type, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      value: this._formBuilder.control(part?.value, [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  public addPart(part?: PersonNamePart): void {
    this.parts.push(this.getPartGroup(part));
  }

  public addPartBelow(index: number): void {
    this.parts.insert(index + 1, this.getPartGroup());
  }

  public removePart(index: number): void {
    this.parts.removeAt(index);
  }

  public movePartUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.parts.controls[index];
    this.parts.removeAt(index);
    this.parts.insert(index - 1, item);
  }

  public movePartDown(index: number): void {
    if (index + 1 >= this.parts.length) {
      return;
    }
    const item = this.parts.controls[index];
    this.parts.removeAt(index);
    this.parts.insert(index + 1, item);
  }

  public clearParts(): void {
    this.parts.clear();
  }

  private setModel(model: PersonName): void {
    if (!this.language) {
      return;
    }
    if (!model) {
      this.form.reset();
    } else {
      this.language.setValue(model.language);
      this.tag.setValue(model.tag);
      this.parts.clear();
      for (const p of model.parts) {
        this.addPart(p);
      }
      this.form.markAsPristine();
    }
  }

  private getModel(): PersonName {
    const parts: PersonNamePart[] = [];

    for (let i = 0; i < this.parts.length; i++) {
      const g = this.parts.controls[i] as FormGroup;
      parts.push({
        type: g.controls.type.value,
        value: g.controls.value.value?.trim(),
      });
    }

    return {
      language: this.language.value,
      tag: this.tag.value,
      parts,
    };
  }
}
