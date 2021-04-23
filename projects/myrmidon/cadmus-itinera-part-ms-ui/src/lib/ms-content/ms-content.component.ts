import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  MsContent,
  MsContentUnit,
  MsLocationRange,
  MsLocationService,
} from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-ms-content',
  templateUrl: './ms-content.component.html',
  styleUrls: ['./ms-content.component.css'],
})
export class MsContentComponent implements OnInit {
  private _content: MsContent | undefined;

  @Input()
  public get content(): MsContent | undefined {
    return this._content;
  }
  public set content(value: MsContent | undefined) {
    this._content = value;
    this.updateForm(value);
  }

  @Output()
  public contentChange: EventEmitter<MsContent>;

  @Output()
  public editorClose: EventEmitter<any>;

  @Input()
  public stateEntries: ThesaurusEntry[] | undefined;

  public form: FormGroup;
  public author: FormControl;
  public claimedAuthor: FormControl;
  public work: FormControl;
  public ranges: FormControl;
  public state: FormControl;
  public incipit: FormControl;
  public explicit: FormControl;
  public note: FormControl;
  public units: FormArray;

  constructor(
    private _formBuilder: FormBuilder,
    private _locService: MsLocationService
  ) {
    // event
    this.contentChange = new EventEmitter<MsContent>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.author = _formBuilder.control(null, Validators.maxLength(50));
    this.claimedAuthor = _formBuilder.control(null, Validators.maxLength(50));
    this.work = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.ranges = _formBuilder.control(
      null,
      Validators.pattern(MsLocationService.rangesRegexp)
    );
    this.state = _formBuilder.control(null, Validators.maxLength(50));
    this.incipit = _formBuilder.control(null, Validators.maxLength(500));
    this.explicit = _formBuilder.control(null, Validators.maxLength(500));
    this.note = _formBuilder.control(null, Validators.maxLength(500));
    this.units = _formBuilder.array([]);
    this.form = _formBuilder.group({
      author: this.author,
      claimedAuthor: this.claimedAuthor,
      work: this.work,
      ranges: this.ranges,
      state: this.state,
      incipit: this.incipit,
      explicit: this.explicit,
      note: this.note,
      units: this.units,
    });
  }

  ngOnInit(): void {
    if (this._content) {
      this.updateForm(this._content);
    }
  }

  private updateForm(model: MsContent): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.author.setValue(model.author);
    this.claimedAuthor.setValue(model.claimedAuthor);
    this.work.setValue(model.work);
    this.ranges.setValue(
      model.ranges
        ? model.ranges
            .map((r) => {
              return this._locService.rangeToString(r);
            })
            .join(' ')
        : null
    );
    this.state.setValue(model.state);
    this.incipit.setValue(model.incipit);
    this.explicit.setValue(model.explicit);
    this.note.setValue(model.note);
    if (model.units?.length) {
      for (const unit of model.units) {
        this.addUnit(unit);
      }
    }
  }

  private splitText(text: string, delimiter = ' '): string[] | undefined {
    if (!text) {
      return undefined;
    }
    const tokens = text
      .split(delimiter)
      .map((t) => {
        return t.trim();
      })
      .filter((t) => {
        return t.length > 0;
      });
    return tokens.length ? tokens : undefined;
  }

  private parseRanges(text: string): MsLocationRange[] | undefined {
    const tokens = this.splitText(text);
    if (!tokens) {
      return undefined;
    }
    const ranges: MsLocationRange[] = tokens
      .map((t) => {
        const bounds = t.split('-');
        const start = this._locService.parseLocation(bounds[0]);
        return {
          start: start,
          end:
            bounds.length > 1
              ? this._locService.parseLocation(bounds[1])
              : start,
        };
      })
      .filter((r) => (r ? true : false));
    return ranges.length ? ranges : undefined;
  }

  private getModel(): MsContent {
    const model: MsContent = {
      author: this.author.value?.trim(),
      claimedAuthor: this.claimedAuthor.value?.trim(),
      work: this.work.value?.trim(),
      ranges: this.parseRanges(this.ranges.value),
      state: this.state.value?.trim(),
      incipit: this.incipit.value?.trim(),
      explicit: this.explicit.value?.trim(),
      note: this.note.value?.trim(),
      units: [],
    };

    for (let i = 0; i < this.units.length; i++) {
      const g = this.units.controls[i] as FormGroup;
      model.units.push({
        label: g.controls.label.value?.trim(),
        incipit: g.controls.unIncipit.value?.trim(),
        explicit: g.controls.unExplicit.value?.trim(),
      });
    }

    return model;
  }

  private getUnitGroup(unit?: MsContentUnit): FormGroup {
    return this._formBuilder.group({
      label: this._formBuilder.control(unit?.label, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      unIncipit: this._formBuilder.control(
        unit?.incipit,
        Validators.maxLength(500)
      ),
      unExplicit: this._formBuilder.control(
        unit?.explicit,
        Validators.maxLength(500)
      ),
    });
  }

  public addUnit(unit?: MsContentUnit): void {
    this.units.push(this.getUnitGroup(unit));
  }

  public removeUnit(index: number): void {
    this.units.removeAt(index);
    this.form.markAsDirty();
  }

  public moveUnitUp(index: number): void {
    if (index < 1) {
      return;
    }
    const unit = this.units.controls[index];
    this.units.removeAt(index);
    this.units.insert(index - 1, unit);
    this.form.markAsDirty();
  }

  public moveUnitDown(index: number): void {
    if (index + 1 >= this.units.length) {
      return;
    }
    const unit = this.units.controls[index];
    this.units.removeAt(index);
    this.units.insert(index + 1, unit);
    this.form.markAsDirty();
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.contentChange.emit(this.getModel());
  }
}
