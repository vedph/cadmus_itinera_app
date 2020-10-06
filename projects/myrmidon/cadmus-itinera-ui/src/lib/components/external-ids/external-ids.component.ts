import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

/**
 * External IDs editor.
 */
@Component({
  selector: 'lib-external-ids',
  templateUrl: './external-ids.component.html',
  styleUrls: ['./external-ids.component.css'],
})
export class ExternalIdsComponent implements OnInit {
  @Input()
  public parentForm: FormGroup;

  public ids: FormArray; // the list of IDs

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.ids = this._formBuilder.array([]);

    if (!this.parentForm) {
      this.parentForm = this._formBuilder.group({
        ids: this.ids,
      });
    } else {
      this.parentForm.addControl('ids', this.ids);
    }
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
    // do not add if falsy or already exists
    if (
      !id ||
      this.ids.controls.some((c: AbstractControl) => {
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
    // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    try {
      const x = new URL(url);
    } catch (_) {
      return false;
    }
    return true;
  }
}
