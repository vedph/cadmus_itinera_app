import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { PersonName, PersonNamePart } from '@myrmidon/cadmus-itinera-core';
import { InplaceEditorBase } from '@myrmidon/cadmus-itinera-ui';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * Person name in-place editor.
 */
@Component({
  selector: 'cadmus-person-name',
  templateUrl: './person-name.component.html',
  styleUrls: ['./person-name.component.css'],
})
export class PersonNameComponent
  extends InplaceEditorBase<PersonName>
  implements OnInit, AfterViewInit, OnDestroy {
  private _partValueSub: Subscription;

  @ViewChildren('partValue') partValues: QueryList<any>;

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

  public language: FormControl;
  public tag: FormControl;
  public parts: FormArray;

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  ngOnInit(): void {
    // create this form
    this.language = this.formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.tag = this.formBuilder.control(null, Validators.maxLength(50));
    this.parts = this.formBuilder.array([], Validators.required);
    this.initEditor('personName', {
      language: this.language,
      tag: this.tag,
      parts: this.parts,
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
    super.ngOnDestroy();
    this._partValueSub.unsubscribe();
  }

  // private areModelsEqual(x: PersonName, y: PersonName): boolean {
  //   if ((!x && y) || (!y && x)) {
  //     return false;
  //   }
  //   if (!x && !y) {
  //     return true;
  //   }
  //   if (x.language !== y.language || x.tag !== y.tag) {
  //     return false;
  //   }
  //   if (x.parts?.length !== y.parts?.length) {
  //     return false;
  //   }
  //   for (let i = 0; i < x.parts.length; i++) {
  //     if (
  //       x.parts[i]?.type !== y.parts[i]?.type ||
  //       x.parts[i]?.value !== y.parts[i]?.value
  //     ) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  private getPartGroup(part?: PersonNamePart): FormGroup {
    return this.formBuilder.group({
      type: this.formBuilder.control(part?.type, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      value: this.formBuilder.control(part?.value, [
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

  protected setModel(model: PersonName): void {
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

  protected getModel(): PersonName {
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
