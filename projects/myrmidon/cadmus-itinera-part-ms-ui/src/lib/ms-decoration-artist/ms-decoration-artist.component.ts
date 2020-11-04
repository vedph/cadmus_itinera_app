import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  DocReference,
  MsDecorationArtist,
} from '@myrmidon/cadmus-itinera-core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cadmus-ms-decoration-artist',
  templateUrl: './ms-decoration-artist.component.html',
  styleUrls: ['./ms-decoration-artist.component.css'],
})
export class MsDecorationArtistComponent implements OnInit {
  private _sources: DocReference[];

  @Input()
  public parentForm: FormGroup;

  @Input()
  public artist: MsDecorationArtist;

  @Input()
  public typeEntries: ThesaurusEntry[];

  @Output()
  public artistChange: EventEmitter<MsDecorationArtist>;

  public type: FormControl;
  public id: FormControl;
  public name: FormControl;
  public note: FormControl;
  public form: FormGroup;

  public sources$: BehaviorSubject<DocReference[]>;

  constructor(formBuilder: FormBuilder) {
    this._sources = [];
    this.sources$ = new BehaviorSubject<DocReference[]>([]);
    // events
    this.artistChange = new EventEmitter<MsDecorationArtist>();
    // form
    this.type = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.id = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.name = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100),
    ]);
    this.note = formBuilder.control(null, [Validators.maxLength(500)]);
    this.form = formBuilder.group({
      type: this.type,
      id: this.id,
      name: this.name,
      note: this.note
    });
  }

  ngOnInit(): void {
    if (this.parentForm) {
      this.parentForm.addControl('size', this.form);
    }

    this.form.valueChanges.pipe(debounceTime(400)).subscribe((_) => {
      this.emitModelChange();
    });

    this.updateForm(this.artist);
  }

  private updateForm(model: MsDecorationArtist): void {
    if (!model) {
      this.form.reset();
      this.sources$.next([]);
    } else {
      this.type.setValue(model.type);
      this.id.setValue(model.id);
      this.name.setValue(model.name);
      this.note.setValue(model.note);
      this.sources$.next(model.sources || []);
      this.form.markAsPristine();
    }
  }

  private getModel(): MsDecorationArtist {
    return {
      type: this.type.value?.trim(),
      id: this.id.value?.trim(),
      name: this.name.value?.trim(),
      note: this.note.value?.trim(),
      sources: this._sources?.length ? this._sources : null,
    };
  }

  private emitModelChange(): void {
    const model = this.getModel();
    if (this.form.valid) {
      this.artistChange.emit(model);
    }
  }

  public onSourcesChanged(sources: DocReference[]): void {
    this._sources = sources || [];
    this.emitModelChange();
  }
}
