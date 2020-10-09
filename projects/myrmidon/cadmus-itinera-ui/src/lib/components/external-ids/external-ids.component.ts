import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * External IDs in-place editor.
 */
@Component({
  selector: 'cadmus-external-ids',
  templateUrl: './external-ids.component.html',
  styleUrls: ['./external-ids.component.css'],
})
export class ExternalIdsComponent implements OnInit {
  private _modelSub: Subscription;
  private _modelSubject: BehaviorSubject<string[]>;

  /**
   * The optional parent form this component should attach to.
   * Set this when the form in this component should contribute
   * to the state of a parent form in the consumer control.
   */
  @Input()
  public parentForm: FormGroup;

  /**
   * The IDs edited by this component, wrapped in a subject
   * stream. This component updates when the stream updates.
   */
  @Input()
  public get model$(): BehaviorSubject<string[]> {
    return this._modelSubject;
  }
  public set model$(value: BehaviorSubject<string[]>) {
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
  public modelChange: EventEmitter<string[]>;

  public form: FormGroup;
  public ids: FormArray; // the list of IDs

  constructor(private _formBuilder: FormBuilder) {
    // events
    this.modelChange = new EventEmitter<string[]>();
  }

  ngOnInit(): void {
    this.ids = this._formBuilder.array([]);
    this.form = this._formBuilder.group({
      ids: this.ids,
    });

    // add it as a child form to the parent, if any.
    // This propagates this form's state into it.
    if (this.parentForm) {
      this.parentForm.addControl('ids', this.form);
    }

    // once we are initialized, set the model to the current
    // value, because if it was set meantime it would be lost
    this.setModel(this._modelSubject?.value);

    // react on this form changes
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((_) => {
      const m = this.getModel();
      if (m) {
        this.modelChange.emit(m);
      }
    });
  }

  private getIdGroup(id?: string): FormGroup {
    return this._formBuilder.group({
      id: this._formBuilder.control(id, [
        Validators.required,
        Validators.maxLength(500),
      ]),
    });
  }

  public addId(id?: string): void {
    // do not add if already exists
    if (this.ids.controls.some((c: AbstractControl) => {
        return c.value === id;
      })
    ) {
      return;
    }
    this.ids.push(this.getIdGroup(id));
  }

  public addIdBelow(index: number): void {
    this.ids.insert(index + 1, this.getIdGroup());
  }

  public removeId(index: number): void {
    this.ids.removeAt(index);
  }

  public moveIdUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.ids.controls[index];
    this.ids.removeAt(index);
    this.ids.insert(index - 1, item);
  }

  public moveIdDown(index: number): void {
    if (index + 1 >= this.ids.length) {
      return;
    }
    const item = this.ids.controls[index];
    this.ids.removeAt(index);
    this.ids.insert(index + 1, item);
  }

  public clearIds(): void {
    this.ids.clear();
  }

  public isValidUrl(url: string): boolean {
    // return new RegExp('^(?:https?:\/\/)?www\.', 'gi').test(url);
    // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    try {
      const x = new URL(url);
    } catch (_) {
      return false;
    }
    return true;
  }

  private setModel(model: string[]): void {
    if (!this.ids) {
      return;
    }
    if (!model) {
      this.form.reset();
    } else {
      this.ids.clear();
      for (const id of model) {
        this.addId(id);
      }
      this.form.markAsPristine();
    }
  }

  public visitUrl(url: string): void {
    window.open(url, '_blank');
  }

  private getModel(): string[] {
    const ids: string[] = [];
    for (let i = 0; i < this.ids.length; i++) {
      const g = this.ids.controls[i] as FormGroup;
      ids.push(g.controls.id.value);
    }
    return ids;
  }
}
