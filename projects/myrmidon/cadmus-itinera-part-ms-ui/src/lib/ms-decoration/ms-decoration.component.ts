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
  MsDecoration,
  MsDecorationArtist,
  MsGuideLetter,
  MsLocationService,
  PhysicalSize,
} from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'cadmus-ms-decoration',
  templateUrl: './ms-decoration.component.html',
  styleUrls: ['./ms-decoration.component.css'],
})
export class MsDecorationComponent implements OnInit {
  private _model: MsDecoration;

  @Input()
  public get model(): MsDecoration {
    return this._model;
  }
  public set model(value: MsDecoration) {
    this._model = value;
    this.setModel(this._model);
  }

  @Output()
  public modelChange: EventEmitter<MsDecoration>;
  @Output()
  public editorClose: EventEmitter<any>;

  @Input()
  public typeEntries: ThesaurusEntry[];
  @Input()
  public layoutEntries: ThesaurusEntry[];
  @Input()
  public toolEntries: ThesaurusEntry[];
  @Input()
  public posEntries: ThesaurusEntry[];
  @Input()
  public guidePosEntries: ThesaurusEntry[];
  @Input()
  public artTypeEntries: ThesaurusEntry[];
  @Input()
  public colorEntries: ThesaurusEntry[];
  @Input()
  public unitEntries: ThesaurusEntry[];
  @Input()
  public sizeTagEntries: ThesaurusEntry[];
  @Input()
  public dimTagEntries: ThesaurusEntry[];

  public type: FormControl;
  public subject: FormControl;
  public colors: FormArray;
  public layout: FormControl;
  public tool: FormControl;
  public start: FormControl;
  public end: FormControl;
  public position: FormControl;
  public description: FormControl;
  public textRelation: FormControl;
  public letters: FormArray;
  public imageId: FormControl;
  public form: FormGroup;

  public size: PhysicalSize;
  public artist: MsDecorationArtist;

  constructor(
    private _formBuilder: FormBuilder,
    private _msLocationService: MsLocationService
  ) {
    // events
    this.modelChange = new EventEmitter<MsDecoration>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.type = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.subject = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.colors = _formBuilder.array([], Validators.required);
    this.layout = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.tool = _formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.start = _formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.end = _formBuilder.control(null, [
      Validators.required,
      Validators.pattern(MsLocationService.locRegexp),
    ]);
    this.position = _formBuilder.control(null, [Validators.maxLength(50)]);
    this.description = _formBuilder.control(null, [Validators.maxLength(1000)]);
    this.textRelation = _formBuilder.control(null, [
      Validators.maxLength(1000),
    ]);
    this.letters = _formBuilder.array([]);
    this.imageId = _formBuilder.control(null, [Validators.maxLength(100)]);
    this.form = _formBuilder.group({
      type: this.type,
      subject: this.subject,
      colors: this.colors,
      layout: this.layout,
      tool: this.tool,
      start: this.start,
      end: this.end,
      position: this.position,
      description: this.description,
      textRelation: this.textRelation,
      guideLetters: this.letters,
      imageId: this.imageId,
    });
  }

  ngOnInit(): void {}

  private setModel(model: MsDecoration): void {
    if (!model) {
      this.form.reset();
      return;
    }
    this.type.setValue(model.type);
    this.subject.setValue(model.subject);
    this.layout.setValue(model.layout);
    this.tool.setValue(model.tool);
    this.start.setValue(this._msLocationService.locationToString(model.start));
    this.end.setValue(this._msLocationService.locationToString(model.end));
    this.position.setValue(model.position);
    this.description.setValue(model.description);
    this.textRelation.setValue(model.textRelation);
    this.imageId.setValue(model.imageId);

    // colors
    this.colors.clear();
    for (let i = 0; i < model.colors?.length || 0; i++) {
      this.addColor(model.colors[i]);
    }

    // guide letters
    this.letters.clear();
    for (let i = 0; i < model.guideLetters?.length || 0; i++) {
      this.addLetter(model.guideLetters[i]);
    }

    // size, artist
    this.size = model.size;
    this.artist = model.artist;
  }

  private getModel(): MsDecoration {
    const model: MsDecoration = {
      type: this.type.value?.trim(),
      subject: this.subject.value?.trim(),
      layout: this.layout.value?.trim(),
      tool: this.tool.value?.trim(),
      start: this._msLocationService.parseLocation(this.start.value),
      end: this._msLocationService.parseLocation(this.end.value),
      position: this.position.value?.trim(),
      description: this.description.value?.trim(),
      textRelation: this.textRelation.value?.trim(),
      imageId: this.imageId.value?.trim(),
      colors: undefined,
    };

    // colors
    if (this.colors.length) {
      model.colors = [];
      for (let i = 0; i < this.colors.length; i++) {
        const g = this.colors.controls[i] as FormGroup;
        const color = g.controls.color.value?.trim();
        if (color) {
          model.colors.push(color);
        }
      }
    }

    // guide letters
    if (this.letters.length) {
      model.guideLetters = [];
      for (let i = 0; i < this.letters.length; i++) {
        const g = this.letters.controls[i] as FormGroup;
        model.guideLetters.push({
          position: g.controls.position.value?.trim(),
          morphology: g.controls.morphology.value?.trim()
        });
      }
    }

    // size, artist
    model.size = this.size;
    model.artist = this.artist;

    return model;
  }

  private getColorGroup(color?: string): FormGroup {
    return this._formBuilder.group({
      color: this._formBuilder.control(color, [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  public addColor(item?: string): void {
    this.colors.push(this.getColorGroup(item));
  }

  public removeColor(index: number): void {
    this.colors.removeAt(index);
  }

  public moveColorUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.colors.controls[index];
    this.colors.removeAt(index);
    this.colors.insert(index - 1, item);
  }

  public moveColorDown(index: number): void {
    if (index + 1 >= this.colors.length) {
      return;
    }
    const item = this.colors.controls[index];
    this.colors.removeAt(index);
    this.colors.insert(index + 1, item);
  }

  private getLetterGroup(letter?: MsGuideLetter): FormGroup {
    return this._formBuilder.group({
      position: this._formBuilder.control(letter?.position, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      morphology: this._formBuilder.control(
        letter?.morphology,
        Validators.maxLength(50)
      ),
    });
  }

  public addLetter(letter?: MsGuideLetter): void {
    this.letters.push(this.getLetterGroup(letter));
  }

  public removeLetter(index: number): void {
    this.letters.removeAt(index);
  }

  public moveLetterUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.letters.controls[index];
    this.letters.removeAt(index);
    this.letters.insert(index - 1, item);
  }

  public moveLetterDown(index: number): void {
    if (index + 1 >= this.letters.length) {
      return;
    }
    const item = this.letters.controls[index];
    this.letters.removeAt(index);
    this.letters.insert(index + 1, item);
  }

  public onSizeChanged(size: PhysicalSize): void {
    this.size = size;
  }

  public onArtistChanged(artist: MsDecorationArtist): void {
    this.artist = artist;
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    const model = this.getModel();
    this.modelChange.emit(model);
  }
}