import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
} from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import {
  CadmusValidators,
  deepCopy,
  ThesaurusEntry,
} from '@myrmidon/cadmus-core';
import {
  MsNumberingsPart,
  MSNUMBERINGS_PART_TYPEID,
} from '../ms-numberings-part';
import { MsNumbering } from '@myrmidon/cadmus-itinera-core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * Manuscript's numbering(s) part.
 * Thesauri (all optional): ms-numbering-eras, ms-numbering-systems,
 * ms-numbering-techniques, ms-numbering-positions.
 */
@Component({
  selector: 'itinera-ms-numberings-part',
  templateUrl: './ms-numberings-part.component.html',
  styleUrls: ['./ms-numberings-part.component.css'],
})
export class MsNumberingsPartComponent
  extends ModelEditorComponentBase<MsNumberingsPart>
  implements OnInit, AfterViewInit, OnDestroy {
  private _centurySubscription: Subscription;

  @ViewChildren('century') centuryQueryList: QueryList<any>;

  public numberings: FormArray;
  public count: FormControl;

  public eraEntries: ThesaurusEntry[] | undefined;
  public sysEntries: ThesaurusEntry[] | undefined;
  public techEntries: ThesaurusEntry[] | undefined;
  public posEntries: ThesaurusEntry[] | undefined;

  constructor(authService: AuthService, private _formBuilder: FormBuilder) {
    super(authService);
    // form
    this.numberings = _formBuilder.array(
      [],
      CadmusValidators.strictMinLengthValidator(1)
    );
    this.form = _formBuilder.group({
      numberings: this.numberings,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  public ngAfterViewInit(): void {
    this._centurySubscription = this.centuryQueryList.changes
      .pipe(debounceTime(300))
      .subscribe((_) => {
        if (this.centuryQueryList.length > 0) {
          this.centuryQueryList.last.nativeElement.focus();
        }
      });
  }

  public ngOnDestroy(): void {
    this._centurySubscription.unsubscribe();
  }

  private updateForm(model: MsNumberingsPart): void {
    if (!model?.numberings?.length) {
      this.form.reset();
      return;
    }
    this.numberings.clear();
    for (const numbering of model.numberings) {
      this.addNumbering(numbering);
    }
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsNumberingsPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'ms-numbering-eras';
    if (this.thesauri && this.thesauri[key]) {
      this.eraEntries = this.thesauri[key].entries;
    } else {
      this.eraEntries = undefined;
    }

    key = 'ms-numbering-systems';
    if (this.thesauri && this.thesauri[key]) {
      this.sysEntries = this.thesauri[key].entries;
    } else {
      this.sysEntries = undefined;
    }

    key = 'ms-numbering-techniques';
    if (this.thesauri && this.thesauri[key]) {
      this.techEntries = this.thesauri[key].entries;
    } else {
      this.techEntries = undefined;
    }

    key = 'ms-numbering-positions';
    if (this.thesauri && this.thesauri[key]) {
      this.posEntries = this.thesauri[key].entries;
    } else {
      this.posEntries = undefined;
    }
  }

  protected getModelFromForm(): MsNumberingsPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSNUMBERINGS_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        numberings: [],
      };
    } else {
      part.numberings = [];
    }
    for (let i = 0; i < this.numberings.length; i++) {
      const g = this.numberings.controls[i] as FormGroup;
      part.numberings.push({
        isMain: g.controls.isMain.value,
        isPagination: g.controls.isPagination.value,
        era: g.controls.era.value?.trim(),
        system: g.controls.system.value?.trim(),
        technique: g.controls.technique.value?.trim(),
        century: g.controls.century.value,
        position: g.controls.position.value?.trim(),
        issues: g.controls.issues.value?.trim(),
      });
      return part;
    }
  }

  private getNumberingGroup(numbering?: MsNumbering): FormGroup {
    return this._formBuilder.group({
      isMain: this._formBuilder.control(numbering?.isMain || false),
      isPagination: this._formBuilder.control(numbering?.isPagination || false),
      era: this._formBuilder.control(numbering?.era, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      system: this._formBuilder.control(numbering?.system, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      technique: this._formBuilder.control(numbering?.technique, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      century: this._formBuilder.control(numbering?.century || 0, [
        Validators.required,
        Validators.min(0),
        Validators.max(21),
      ]),
      position: this._formBuilder.control(
        numbering?.position,
        Validators.maxLength(50)
      ),
      issues: this._formBuilder.control(
        numbering?.issues,
        Validators.maxLength(300)
      ),
    });
  }

  public addNumbering(numbering?: MsNumbering): void {
    this.numberings.push(this.getNumberingGroup(numbering));
  }

  public removeNumbering(index: number): void {
    this.numberings.removeAt(index);
    this.form.markAsDirty();
  }

  public moveNumberingUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.numberings.controls[index];
    this.numberings.removeAt(index);
    this.numberings.insert(index - 1, item);
    this.form.markAsDirty();
  }

  public moveNumberingDown(index: number): void {
    if (index + 1 >= this.numberings.length) {
      return;
    }
    const item = this.numberings.controls[index];
    this.numberings.removeAt(index);
    this.numberings.insert(index + 1, item);
    this.form.markAsDirty();
  }
}
