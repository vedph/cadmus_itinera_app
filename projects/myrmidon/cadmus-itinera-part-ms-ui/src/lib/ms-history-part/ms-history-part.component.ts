import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
} from '@angular/forms';

import { ModelEditorComponentBase, DialogService } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
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
 * Thesauri: ms-provenance-areas, ms-history-person-roles, languages,
 * ms-history-person-tags, ms-annotation-types, ms-restoration-types
 * (all optional).
 */
@Component({
  selector: 'cadmus-ms-history-part',
  templateUrl: './ms-history-part.component.html',
  styleUrls: ['./ms-history-part.component.css'],
})
export class MsHistoryPartComponent
  extends ModelEditorComponentBase<MsHistoryPart>
  implements OnInit {
  public provenances: FormArray;
  public history: FormControl;

  public persons: MsHistoryPerson[];
  public annotations: MsAnnotation[];
  public restorations: MsRestoration[];

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

  // thesauri:
  // history
  public areaEntries: ThesaurusEntry[];
  // persons
  public roleEntries: ThesaurusEntry[];
  public langEntries: ThesaurusEntry[];
  public tagEntries: ThesaurusEntry[];
  // annotations
  public annTypeEntries: ThesaurusEntry[];
  // restorations
  public rstTypeEntries: ThesaurusEntry[];

  constructor(
    authService: AuthService,
    private _formBuilder: FormBuilder,
    private _dialogService: DialogService,
    private _msLocationService: MsLocationService
  ) {
    super(authService);
    this.persons = [];
    this.annotations = [];
    this.restorations = [];
    this.personIndex = -1;
    this.annotationIndex = -1;
    this.restorationIndex = -1;
    // form
    this.provenances = _formBuilder.array([], Validators.required);
    this.history = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(5000),
    ]);
    this.form = _formBuilder.group({
      provenances: this.provenances,
      history: this.history,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsHistoryPart): void {
    this.personIndex = -1;
    this.annotationIndex = -1;
    this.restorationIndex = -1;
    this.editedPerson = null;
    this.editedAnnotation = null;
    this.editedRestoration = null;

    if (!model) {
      this.persons = [];
      this.annotations = [];
      this.restorations = [];
      this.form.reset();
      return;
    }
    this.persons = model.persons || [];
    this.annotations = model.annotations || [];
    this.restorations = model.restorations || [];

    this.provenances.clear();
    for (let i = 0; i < model.provenances?.length || 0; i++) {
      this.addProvenance(model.provenances[i]);
    }
    this.history.setValue(model.history);
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsHistoryPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    let key = 'ms-provenance-areas';
    if (this.thesauri && this.thesauri[key]) {
      this.areaEntries = this.thesauri[key].entries;
    } else {
      this.areaEntries = null;
    }

    key = 'ms-history-person-roles';
    if (this.thesauri && this.thesauri[key]) {
      this.roleEntries = this.thesauri[key].entries;
    } else {
      this.roleEntries = null;
    }

    key = 'languages';
    if (this.thesauri && this.thesauri[key]) {
      this.langEntries = this.thesauri[key].entries;
    } else {
      this.langEntries = null;
    }

    key = 'ms-history-person-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }

    key = 'ms-annotation-types';
    if (this.thesauri && this.thesauri[key]) {
      this.annTypeEntries = this.thesauri[key].entries;
    } else {
      this.annTypeEntries = null;
    }

    key = 'ms-restoration-types';
    if (this.thesauri && this.thesauri[key]) {
      this.rstTypeEntries = this.thesauri[key].entries;
    } else {
      this.rstTypeEntries = null;
    }
  }

  protected getModelFromForm(): MsHistoryPart {
    let part = this.getModelFromJson();
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
    part.persons = this.persons?.length ? this.persons : undefined;
    part.annotations = this.annotations?.length ? this.annotations : undefined;
    part.restorations = this.restorations?.length
      ? this.restorations
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
  }

  public removeProvenance(index: number): void {
    this.provenances.removeAt(index);
  }

  public moveProvenanceUp(index: number): void {
    if (index < 1) {
      return;
    }
    const provenance = this.provenances.controls[index];
    this.provenances.removeAt(index);
    this.provenances.insert(index - 1, provenance);
  }

  public moveProvenanceDown(index: number): void {
    if (index + 1 >= this.provenances.length) {
      return;
    }
    const provenance = this.provenances.controls[index];
    this.provenances.removeAt(index);
    this.provenances.insert(index + 1, provenance);
  }

  // persons
  public getFullName(name: PersonName | null): string {
    if (!name) {
      return '';
    }
    const sb: string[] = [];
    for (let i = 0; i < name.parts?.length || 0; i++) {
      sb.push(name.parts[i].value);
    }
    return sb.join(' ');
  }

  public addPerson(): void {
    const person: MsHistoryPerson = {
      name: null,
    };
    this.persons = [...this.persons, person];
    this.editPerson(this.persons.length - 1);
    this.form.markAsDirty();
  }

  public editPerson(index: number): void {
    if (index < 0) {
      this.personEditorOpen = false;
      this.personIndex = -1;
      this.editedPerson = null;
    } else {
      this.personEditorOpen = true;
      this.personIndex = index;
      this.editedPerson = this.persons[index];
    }
  }

  public onPersonSaved(person: MsHistoryPerson): void {
    this.persons = this.persons.map((s, i) =>
      i === this.personIndex ? person : s
    );
    this.editPerson(-1);
    this.form.markAsDirty();
  }

  public onPersonClosed(): void {
    this.editPerson(-1);
  }

  public deletePerson(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete person?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const persons = [...this.persons];
          persons.splice(index, 1);
          this.persons = persons;
          this.form.markAsDirty();
        }
      });
  }

  public movePersonUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.persons[index];
    const persons = [...this.persons];
    persons.splice(index, 1);
    persons.splice(index - 1, 0, item);
    this.persons = persons;
    this.form.markAsDirty();
  }

  public movePersonDown(index: number): void {
    if (index + 1 >= this.persons.length) {
      return;
    }
    const item = this.persons[index];
    const items = [...this.persons];
    items.splice(index, 1);
    items.splice(index + 1, 0, item);
    this.persons = items;
    this.form.markAsDirty();
  }

  // annotations
  public locationToString(location: MsLocation): string {
    return this._msLocationService.locationToString(location);
  }

  public addAnnotation(): void {
    const annotation: MsAnnotation = {
      language: null,
      type: null,
      text: null,
    };
    this.annotations = [...this.annotations, annotation];
    this.editAnnotation(this.annotations.length - 1);
    this.form.markAsDirty();
  }

  public editAnnotation(index: number): void {
    if (index < 0) {
      this.annotationEditorOpen = false;
      this.annotationIndex = -1;
      this.editedAnnotation = null;
    } else {
      this.annotationEditorOpen = true;
      this.annotationIndex = index;
      this.editedAnnotation = this.annotations[index];
    }
  }

  public onAnnotationSaved(annotation: MsAnnotation): void {
    this.annotations = this.annotations.map((s, i) =>
      i === this.annotationIndex ? annotation : s
    );
    this.editAnnotation(-1);
    this.form.markAsDirty();
  }

  public onAnnotationClosed(): void {
    this.editAnnotation(-1);
  }

  public deleteAnnotation(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete annotation?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const annotations = [...this.annotations];
          annotations.splice(index, 1);
          this.annotations = annotations;
          this.form.markAsDirty();
        }
      });
  }

  public moveAnnotationUp(index: number): void {
    if (index < 1) {
      return;
    }
    const annotation = this.annotations[index];
    const annotations = [...this.annotations];
    annotations.splice(index, 1);
    annotations.splice(index - 1, 0, annotation);
    this.annotations = annotations;
    this.form.markAsDirty();
  }

  public moveAnnotationDown(index: number): void {
    if (index + 1 >= this.annotations.length) {
      return;
    }
    const annotation = this.annotations[index];
    const annotations = [...this.annotations];
    annotations.splice(index, 1);
    annotations.splice(index + 1, 0, annotation);
    this.annotations = annotations;
    this.form.markAsDirty();
  }

  // restorations
  public addRestoration(): void {
    const restoration: MsRestoration = {
      type: null,
    };
    this.restorations = [...this.restorations, restoration];
    this.editRestoration(this.restorations.length - 1);
    this.form.markAsDirty();
  }

  public editRestoration(index: number): void {
    if (index < 0) {
      this.restorationEditorOpen = false;
      this.restorationIndex = -1;
      this.editedRestoration = null;
    } else {
      this.restorationEditorOpen = true;
      this.restorationIndex = index;
      this.editedRestoration = this.restorations[index];
    }
  }

  public onRestorationSaved(restoration: MsRestoration): void {
    this.restorations = this.restorations.map((s, i) =>
      i === this.restorationIndex ? restoration : s
    );
    this.editRestoration(-1);
    this.form.markAsDirty();
  }

  public onRestorationClosed(): void {
    this.editRestoration(-1);
  }

  public deleteRestoration(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete restoration?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          const restorations = [...this.restorations];
          restorations.splice(index, 1);
          this.restorations = restorations;
          this.form.markAsDirty();
        }
      });
  }

  public moveRestorationUp(index: number): void {
    if (index < 1) {
      return;
    }
    const restoration = this.restorations[index];
    const restorations = [...this.restorations];
    restorations.splice(index, 1);
    restorations.splice(index - 1, 0, restoration);
    this.restorations = restorations;
    this.form.markAsDirty();
  }

  public moveRestorationDown(index: number): void {
    if (index + 1 >= this.restorations.length) {
      return;
    }
    const restoration = this.restorations[index];
    const restorations = [...this.restorations];
    restorations.splice(index, 1);
    restorations.splice(index + 1, 0, restoration);
    this.restorations = restorations;
    this.form.markAsDirty();
  }
}
