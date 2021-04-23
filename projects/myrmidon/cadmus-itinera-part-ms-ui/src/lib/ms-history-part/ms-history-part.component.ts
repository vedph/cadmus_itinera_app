import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
} from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { deepCopy, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsHistoryPart, MSHISTORY_PART_TYPEID } from '../ms-history-part';
import {
  GeoAddress,
  MsAnnotation,
  MsHistoryPerson,
  MsLocation,
  MsLocationService,
  MsRestoration,
  PersonName,
} from '@myrmidon/cadmus-itinera-core';
import { take } from 'rxjs/operators';

/**
 * Manuscript's history part editor.
 * Thesauri: ms-provenance-areas, ms-history-person-roles,
 * ms-history-languages, ms-annotation-types, ms-restoration-types,
 * person-name-types, person-name-tags, doc-reference-tags (all optional).
 */
@Component({
  selector: 'itinera-ms-history-part',
  templateUrl: './ms-history-part.component.html',
  styleUrls: ['./ms-history-part.component.css'],
})
export class MsHistoryPartComponent
  extends ModelEditorComponentBase<MsHistoryPart>
  implements OnInit {
  public provenances: FormArray;
  public history: FormControl;
  public persons: FormControl;
  public annotations: FormControl;
  public restorations: FormControl;

  public personIndex: number;
  public editedPerson: MsHistoryPerson;
  public personEditorOpen: boolean;
  public annotationIndex: number;
  public editedAnnotation: MsAnnotation;
  public annotationEditorOpen: boolean;
  public restorationIndex: number;
  public editedRestoration: MsRestoration;
  public restorationEditorOpen: boolean;

  public editorOptions = {
    theme: 'vs-light',
    language: 'markdown',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  @ViewChild('editorhist') histEditor: any;

  // thesauri:
  // history
  public areaEntries: ThesaurusEntry[] | undefined;
  // persons
  public roleEntries: ThesaurusEntry[] | undefined;
  public langEntries: ThesaurusEntry[] | undefined;
  public nameTypeEntries: ThesaurusEntry[] | undefined;
  public nameTagEntries: ThesaurusEntry[] | undefined;
  // annotations
  public annTypeEntries: ThesaurusEntry[] | undefined;
  public docRefTagEntries: ThesaurusEntry[] | undefined;
  // restorations
  public rstTypeEntries: ThesaurusEntry[] | undefined;

  constructor(
    authService: AuthService,
    private _formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _msLocationService: MsLocationService
  ) {
    super(authService);
    this.personIndex = -1;
    this.annotationIndex = -1;
    this.restorationIndex = -1;
    // form
    this.provenances = _formBuilder.array([]);
    this.history = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(5000),
    ]);
    this.persons = _formBuilder.control([]);
    this.annotations = _formBuilder.control([]);
    this.restorations = _formBuilder.control([]);
    this.form = _formBuilder.group({
      provenances: this.provenances,
      history: this.history,
      persons: this.persons,
      annotations: this.annotations,
      restorations: this.restorations,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  public onTabIndexChanged(index: number): void {
    // HACK
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    // https://stackoverflow.com/questions/37412950/ngx-monaco-editor-unable-to-set-layout-size-when-container-changes-using-tab
    if (index === 1) {
      setTimeout(() => {
        this.histEditor._editor.layout();
      }, 100);
    }
  }

  private updateForm(model: MsHistoryPart): void {
    this.personIndex = -1;
    this.annotationIndex = -1;
    this.restorationIndex = -1;
    this.editedPerson = null;
    this.editedAnnotation = null;
    this.editedRestoration = null;

    if (!model) {
      this.form.reset();
      return;
    }
    this.persons.setValue(model.persons || []);
    this.annotations.setValue(model.annotations || []);
    this.restorations.setValue(model.restorations || []);

    this.provenances.clear();
    for (let i = 0; i < model.provenances?.length || 0; i++) {
      this.addProvenance(model.provenances[i]);
    }
    this.history.setValue(model.history);
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsHistoryPart): void {
    this.updateForm(deepCopy(model));
  }

  protected onThesauriSet(): void {
    let key = 'ms-provenance-areas';
    if (this.thesauri && this.thesauri[key]) {
      this.areaEntries = this.thesauri[key].entries;
    } else {
      this.areaEntries = undefined;
    }

    key = 'ms-history-person-roles';
    if (this.thesauri && this.thesauri[key]) {
      this.roleEntries = this.thesauri[key].entries;
    } else {
      this.roleEntries = undefined;
    }

    key = 'ms-history-languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = undefined;
    }

    key = 'ms-annotation-types';
    if (this.thesauri && this.thesauri[key]) {
      this.annTypeEntries = this.thesauri[key].entries;
    } else {
      this.annTypeEntries = undefined;
    }

    key = 'ms-restoration-types';
    if (this.thesauri && this.thesauri[key]) {
      this.rstTypeEntries = this.thesauri[key].entries;
    } else {
      this.rstTypeEntries = undefined;
    }

    key = 'person-name-types';
    if (this.thesauri && this.thesauri[key]) {
      this.nameTypeEntries = this.thesauri[key].entries;
    } else {
      this.nameTypeEntries = undefined;
    }

    key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.docRefTagEntries = this.thesauri[key].entries;
    } else {
      this.docRefTagEntries = undefined;
    }

    key = 'person-name-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.nameTagEntries = this.thesauri[key].entries;
    } else {
      this.nameTagEntries = undefined;
    }
  }

  protected getModelFromForm(): MsHistoryPart {
    let part = deepCopy(this.model);
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSHISTORY_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        provenances: [],
        history: null,
      };
    }

    for (let i = 0; i < this.provenances.length; i++) {
      const g = this.provenances.controls[i] as FormGroup;
      part.provenances.push({
        area: g.controls.area.value?.trim(),
        address: g.controls.address.value?.trim(),
      });
    }
    part.history = this.history.value?.trim();
    part.persons = this.persons.value?.length ? this.persons.value : undefined;
    part.annotations = this.annotations.value?.length
      ? this.annotations.value
      : undefined;
    part.restorations = this.restorations.value?.length
      ? this.restorations.value
      : undefined;
    return part;
  }

  // provenances
  private getProvenanceGroup(provenance?: GeoAddress): FormGroup {
    return this._formBuilder.group({
      area: this._formBuilder.control(provenance?.area),
      address: this._formBuilder.control(provenance?.address),
    });
  }

  public addProvenance(provenance?: GeoAddress): void {
    this.provenances.push(this.getProvenanceGroup(provenance));
    this.form.markAsDirty();
  }

  public removeProvenance(index: number): void {
    this.provenances.removeAt(index);
    this.form.markAsDirty();
  }

  public moveProvenanceUp(index: number): void {
    if (index < 1) {
      return;
    }
    const provenance = this.provenances.controls[index];
    this.provenances.removeAt(index);
    this.provenances.insert(index - 1, provenance);
    this.form.markAsDirty();
  }

  public moveProvenanceDown(index: number): void {
    if (index + 1 >= this.provenances.length) {
      return;
    }
    const provenance = this.provenances.controls[index];
    this.provenances.removeAt(index);
    this.provenances.insert(index + 1, provenance);
    this.form.markAsDirty();
  }

  // persons
  public getFullName(name: PersonName | undefined): string {
    if (!name) {
      return '';
    }
    const sb: string[] = [];
    for (let i = 0; i < name.parts?.length || 0; i++) {
      sb.push(name.parts[i].value);
    }
    return sb.join(' ');
  }

  private closePersonEditor(): void {
    this.personEditorOpen = false;
    this.personIndex = -1;
    this.editedPerson = null;
  }

  public addPerson(): void {
    this.personIndex = -1;
    this.editedPerson = {
      name: null,
    };
    this.personEditorOpen = true;
  }

  public editPerson(index: number): void {
    this.personIndex = index;
    this.personEditorOpen = true;
    this.editedPerson = this.persons.value[index];
  }

  public onPersonChange(person: MsHistoryPerson): void {
    if (this.personIndex === -1) {
      this.persons.value.push(person);
    } else {
      this.persons.value.splice(this.personIndex, 1, person);
    }
    this.closePersonEditor();
    this.form.markAsDirty();
  }

  public onPersonClose(): void {
    this.closePersonEditor();
  }

  public deletePerson(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete person?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          if (this.personIndex === index) {
            this.personEditorOpen = false;
          }
          this.persons.value.splice(index, 1);
          this.form.markAsDirty();
        }
      });
  }

  public movePersonUp(index: number): void {
    if (index < 1) {
      return;
    }
    const person = this.persons.value[index];
    const persons = [...this.persons.value];
    persons.splice(index, 1);
    persons.splice(index - 1, 0, person);
    this.persons.setValue(persons);
    this.form.markAsDirty();
  }

  public movePersonDown(index: number): void {
    if (index + 1 >= this.persons.value.length) {
      return;
    }
    const person = this.persons.value[index];
    const persons = [...this.persons.value];
    persons.splice(index, 1);
    persons.splice(index + 1, 0, person);
    this.persons.setValue(persons);
    this.form.markAsDirty();
  }

  // annotations
  public locationToString(location: MsLocation): string {
    return this._msLocationService.locationToString(location);
  }

  private closeAnnotationEditor(): void {
    this.annotationEditorOpen = false;
    this.annotationIndex = -1;
    this.editedAnnotation = undefined;
  }

  public addAnnotation(): void {
    this.annotationIndex = -1;
    this.editedAnnotation = {
      language: null,
      type: null,
      text: null,
    };
    this.annotationEditorOpen = true;
    this.form.markAsDirty();
  }

  public editAnnotation(index: number): void {
    this.annotationEditorOpen = true;
    this.annotationIndex = index;
    this.editedAnnotation = this.annotations.value[index];
  }

  public onAnnotationChange(annotation: MsAnnotation): void {
    if (this.annotationIndex === -1) {
      this.annotations.value.push(annotation);
    } else {
      this.annotations.value.splice(this.annotationIndex, 1, annotation);
    }
    this.closeAnnotationEditor();
    this.form.markAsDirty();
  }

  public onAnnotationClose(): void {
    this.closeAnnotationEditor();
  }

  public deleteAnnotation(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete annotation?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          if (this.annotationIndex === index) {
            this.annotationEditorOpen = false;
          }
          this.annotations.value.splice(index, 1);
          this.form.markAsDirty();
        }
      });
  }

  public moveAnnotationUp(index: number): void {
    if (index < 1) {
      return;
    }
    const annotation = this.annotations.value[index];
    const annotations = [...this.annotations.value];
    annotations.splice(index, 1);
    annotations.splice(index - 1, 0, annotation);
    this.annotations.setValue(annotations);
    this.form.markAsDirty();
  }

  public moveAnnotationDown(index: number): void {
    if (index + 1 >= this.annotations.value.length) {
      return;
    }
    const annotation = this.annotations.value[index];
    const annotations = [...this.annotations.value];
    annotations.splice(index, 1);
    annotations.splice(index + 1, 0, annotation);
    this.annotations.setValue(annotations);
    this.form.markAsDirty();
  }

  // restorations
  private closeRestorationEditor(): void {
    this.restorationEditorOpen = false;
    this.restorationIndex = -1;
    this.editedRestoration = null;
  }

  public addRestoration(): void {
    this.restorationIndex = -1;
    this.editedRestoration = {
      type: null,
    };
    this.form.markAsDirty();
    this.restorationEditorOpen = true;
  }

  public editRestoration(index: number): void {
    this.restorationEditorOpen = true;
    this.restorationIndex = index;
    this.editedRestoration = this.restorations.value[index];
  }

  public onRestorationChange(restoration: MsRestoration): void {
    if (this.restorationIndex === -1) {
      this.restorations.value.push(restoration);
    } else {
      this.restorations.value.splice(this.restorationIndex, 1, restoration);
    }
    this.closeRestorationEditor();
    this.form.markAsDirty();
  }

  public onRestorationClose(): void {
    this.closeRestorationEditor();
  }

  public deleteRestoration(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete restoration?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          if (this.restorationIndex === index) {
            this.restorationEditorOpen = false;
          }
          this.restorations.value.splice(index, 1);
          this.form.markAsDirty();
        }
      });
  }

  public moveRestorationUp(index: number): void {
    if (index < 1) {
      return;
    }
    const restoration = this.restorations.value[index];
    const restorations = [...this.restorations.value];
    restorations.splice(index, 1);
    restorations.splice(index - 1, 0, restoration);
    this.restorations.setValue(restorations);
    this.form.markAsDirty();
  }

  public moveRestorationDown(index: number): void {
    if (index + 1 >= this.restorations.value.length) {
      return;
    }
    const restoration = this.restorations[index];
    const restorations = [...this.restorations.value];
    restorations.splice(index, 1);
    restorations.splice(index + 1, 0, restoration);
    this.restorations.setValue(restorations);
    this.form.markAsDirty();
  }
}
