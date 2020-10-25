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
import {
  MsHistoryPart,
  MSHISTORY_PART_TYPEID,
} from '../ms-history-part';
import {
  GeoAddress,
  MsAnnotation,
  MsHistoryPerson,
  MsRestoration,
} from '@myrmidon/cadmus-itinera-core';

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

  constructor(authService: AuthService, private _formBuilder: FormBuilder) {
    super(authService);
    this.persons = [];
    this.annotations = [];
    this.restorations = [];
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
      this.addProvenance(model[i]);
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
  // TODO

  // annotations
  // TODO

  // restorations
  // TODO
}
