import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoricalDate, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { Chronotope } from '@myrmidon/cadmus-itinera-core';
import { DialogService } from '@myrmidon/cadmus-ui';
import { take } from 'rxjs/operators';

/**
 * Chronotopes list editor.
 */
@Component({
  selector: 'itinera-chronotopes',
  templateUrl: './chronotopes.component.html',
  styleUrls: ['./chronotopes.component.css'],
})
export class ChronotopesComponent implements OnInit {
  private _editedIndex: number;
  private _chronotopes: Chronotope[] | undefined;

  public editedChronotope: Chronotope | undefined;

  /**
   * chronotope-tags entries.
   */
  @Input()
  public tagEntries: ThesaurusEntry[] | undefined;

  /**
   * doc-reference-tags entries.
   */
  @Input()
  public docRefTagEntries: ThesaurusEntry[] | undefined;

  /**
   * The list of chronotopes being edited.
   */
  @Input()
  public get chronotopes(): Chronotope[] | undefined {
    return this._chronotopes;
  }
  public set chronotopes(value: Chronotope[] | undefined) {
    this._chronotopes = value || [];
    this._editedIndex = -1;
    this.editedChronotope = undefined;
  }

  /**
   * Emitted whenever any chronotope changes in the list.
   */
  @Output()
  public chronotopesChange: EventEmitter<Chronotope[]>;

  constructor(private _dialogService: DialogService) {
    this.chronotopesChange = new EventEmitter<Chronotope[]>();
    this._editedIndex = -1;
    this._chronotopes = [];
  }

  ngOnInit(): void {}

  private closeChronotopeEditor(): void {
    this._editedIndex = -1;
    this.editedChronotope = undefined;
  }

  public addChronotope(): void {
    this._editedIndex = -1;
    this.editedChronotope = {
      place: null,
      date: null,
    };
  }

  public editChronotope(index: number): void {
    this._editedIndex = index;
    this.editedChronotope = this._chronotopes[index];
  }

  public onChronotopeChange(chronotope: Chronotope): void {
    if (this._editedIndex === -1) {
      this._chronotopes.push(chronotope);
    } else {
      this._chronotopes.splice(this._editedIndex, 1, chronotope);
    }
    this.closeChronotopeEditor();
    this.chronotopesChange.emit(this._chronotopes);
  }

  public onChronotopeClose(): void {
    this.closeChronotopeEditor();
  }

  public deleteChronotope(index: number): void {
    this._dialogService
      .confirm('Confirmation', 'Delete chronotope?')
      .pipe(take(1))
      .subscribe((yes) => {
        if (yes) {
          this.closeChronotopeEditor();
          this._chronotopes.splice(index, 1);
          this.chronotopesChange.emit(this._chronotopes);
        }
      });
  }

  public moveChronotopeUp(index: number): void {
    if (index < 1) {
      return;
    }
    this.closeChronotopeEditor();
    const chronotope = this._chronotopes[index];
    const chronotopes = [...this._chronotopes];
    chronotopes.splice(index, 1);
    chronotopes.splice(index - 1, 0, chronotope);
    this._chronotopes = chronotopes;
    this.chronotopesChange.emit(this._chronotopes);
  }

  public moveChronotopeDown(index: number): void {
    if (index + 1 >= this._chronotopes.length) {
      return;
    }
    this.closeChronotopeEditor();
    const chronotope = this._chronotopes[index];
    const chronotopes = [...this._chronotopes];
    chronotopes.splice(index, 1);
    chronotopes.splice(index + 1, 0, chronotope);
    this._chronotopes = chronotopes;
    this.chronotopesChange.emit(this._chronotopes);
  }

  public chronotopeToString(chronotope: Chronotope): string {
    if (!chronotope) {
      return '';
    }
    const sb: string[] = [];

    if (chronotope.tag) {
      sb.push(chronotope.tag);
      sb.push(': ');
    }

    if (chronotope.place) {
      sb.push(chronotope.place);
      sb.push(', ');
    }
    if (chronotope.date) {
      sb.push(new HistoricalDate(chronotope.date).toString());
    }

    return sb.join('');
  }
}
