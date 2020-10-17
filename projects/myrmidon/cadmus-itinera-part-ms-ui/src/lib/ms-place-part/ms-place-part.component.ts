import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { MsPlacePart, MSPLACE_PART_TYPEID } from '../ms-place-part';
import { DocReference, MsLocationService } from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';

/**
 * Manuscript's place of origin part editor.
 * Thesauri: ms-place-areas (optional), doc-reference-tags (optional).
 */
@Component({
  selector: 'cadmus-ms-place-part',
  templateUrl: './ms-place-part.component.html',
  styleUrls: ['./ms-place-part.component.css'],
})
export class MsPlacePartComponent
  extends ModelEditorComponentBase<MsPlacePart>
  implements OnInit {
  public area: FormControl;
  public address: FormControl;
  public city: FormControl;
  public site: FormControl;
  public subscriber: FormControl;
  public subscriptionLoc: FormControl;
  public sources$: BehaviorSubject<DocReference[]>;
  public sources: DocReference[];

  public areaEntries: ThesaurusEntry[];
  public tagEntries: ThesaurusEntry[];

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _msLocationService: MsLocationService
  ) {
    super(authService);
    this.sources$ = new BehaviorSubject<DocReference[]>([]);
    this.sources = [];
    // form
    this.area = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.address = formBuilder.control(null, Validators.maxLength(300));
    this.city = formBuilder.control(null, Validators.maxLength(50));
    this.site = formBuilder.control(null, Validators.maxLength(100));
    this.subscriber = formBuilder.control(null, Validators.maxLength(50));
    this.subscriptionLoc = formBuilder.control(
      null,
      Validators.pattern(MsLocationService.locRegexp)
    );
    this.form = formBuilder.group({
      area: this.area,
      address: this.address,
      city: this.city,
      site: this.site,
      subscriber: this.subscriber,
      subscriptionLoc: this.subscriptionLoc,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
  }

  private updateForm(model: MsPlacePart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.area.setValue(model.area);
    this.address.setValue(model.address);
    this.city.setValue(model.city);
    this.site.setValue(model.site);
    this.subscriber.setValue(model.city);
    this.subscriptionLoc.setValue(
      this._msLocationService.locationToString(model.subscriptionLoc)
    );
    this.sources$.next(model.sources);
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsPlacePart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    let key = 'ms-place-areas';
    if (this.thesauri && this.thesauri[key]) {
      this.areaEntries = this.thesauri[key].entries;
    } else {
      this.areaEntries = null;
    }
    key = 'doc-reference-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): MsPlacePart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSPLACE_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        area: null
      };
    }
    part.area = this.area.value?.trim();
    part.address = this.address.value?.trim();
    part.city = this.city.value?.trim();
    part.site = this.site.value?.trim();
    part.subscriber = this.subscriber.value?.trim();
    part.subscriptionLoc = this.subscriptionLoc.value?.trim();
    part.sources = this.sources$.value;
    return part;
  }

  public onSourcesChange(sources: DocReference[]): void {
    this.sources = sources;
  }
}
