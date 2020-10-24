import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  // https://stackoverflow.com/questions/40680321/get-all-validation-errors-from-angular-2-formgroup
  public getFormErrors(form: AbstractControl): ValidationErrors {
    if (form instanceof FormControl) {
      // Return FormControl errors or null
      return form.errors ?? null;
    }
    if (form instanceof FormGroup) {
      const groupErrors = form.errors;
      // form group can contain errors itself, in that case add'em
      const formErrors = groupErrors ? { groupErrors } : {};
      Object.keys(form.controls).forEach((key) => {
        // recursive call of the FormGroup fields
        const error = this.getFormErrors(form.get(key));
        if (error !== null) {
          // only add error if not null
          formErrors[key] = error;
        }
      });
      // return FormGroup errors or null
      return Object.keys(formErrors).length > 0 ? formErrors : null;
    }
  }
}
