import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { AuthService } from '@myrmidon/cadmus-api';
import {
  MsPoemRangesPart,
  MSPOEM_RANGES_PART_TYPEID,
} from '../ms-poem-ranges-part';
import { AlnumRangeService } from '@myrmidon/cadmus-itinera-core';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { debounceTime } from 'rxjs/operators';

/**
 * Manuscript's poem ranges part.
 * Thesauri: ms-poem-ranges-tags (optional).
 */
@Component({
  selector: 'cadmus-ms-poem-ranges-part',
  templateUrl: './ms-poem-ranges-part.component.html',
  styleUrls: ['./ms-poem-ranges-part.component.css'],
})
export class MsPoemRangesPartComponent
  extends ModelEditorComponentBase<MsPoemRangesPart>
  implements OnInit {
  public tag: FormControl;
  public ranges: FormControl;
  public note: FormControl;
  public count: FormControl;

  public tagEntries: ThesaurusEntry[];

  public expanded: string;

  constructor(
    authService: AuthService,
    formBuilder: FormBuilder,
    private _alnumRangeService: AlnumRangeService
  ) {
    super(authService);
    // form
    this.tag = formBuilder.control(null, Validators.maxLength(50));
    this.ranges = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(500),
    ]);
    this.note = formBuilder.control(null, Validators.maxLength(500));
    this.count = formBuilder.control(0, Validators.min(1));
    this.form = formBuilder.group({
      tag: this.tag,
      ranges: this.ranges,
      note: this.note,
      count: this.count,
    });
  }

  public ngOnInit(): void {
    this.initEditor();
    this.ranges.valueChanges.pipe(debounceTime(300)).subscribe((text) => {
      this.expand(text);
    });
  }

  private updateForm(model: MsPoemRangesPart): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.tag.setValue(model.tag);
    this.ranges.setValue(this._alnumRangeService.rangesToString(model.ranges));
    this.note.setValue(model.note);
    // count will be updated on ranges value changes
    this.form.markAsPristine();
  }

  protected onModelSet(model: MsPoemRangesPart): void {
    this.updateForm(model);
  }

  protected onThesauriSet(): void {
    const key = 'ms-poem-ranges-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
  }

  protected getModelFromForm(): MsPoemRangesPart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: MSPOEM_RANGES_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        ranges: [],
      };
    } else {
      part.ranges = [];
    }
    part.tag = this.tag.value?.trim();
    part.ranges = this._alnumRangeService.parseRanges(this.ranges.value);
    part.note = this.note.value?.trim();
    return part;
  }

  private expand(text: string): void {
    try {
      const ranges = this._alnumRangeService.parseRanges(text);
      this.count.setValue(ranges.length);
      const expanded = this._alnumRangeService.expandRanges(ranges);
      this.expanded = expanded.join(' ');
    } catch (e) {
      console.log(e);
    }
  }
}
