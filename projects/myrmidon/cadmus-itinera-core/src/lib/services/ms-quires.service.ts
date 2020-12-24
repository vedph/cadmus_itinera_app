import { Injectable } from '@angular/core';
import { MsQuire } from '../models';

// regex groups: from an expression like "*1-3^4+2 {note here}":
// [1]=[tag]
// [2]=start
// [3]=[end]
// [4]=count
// [5]=[delta-op]
// [6]=[delta]
// [7]=[note]
const M_TAG = 1;
const M_START = 2;
const M_END = 3;
const M_COUNT = 4;
const M_DELTAOP = 5;
const M_DELTA = 6;
const M_NOTE = 7;

@Injectable({
  providedIn: 'root',
})
export class MsQuiresService {
  public static readonly quireRegExp = new RegExp(
    '(\[[^]]+\])?([0-9]+)(?:-([0-9]+))?\\^([0-9]+)(?:([-+])([0-9]+))?(?:\\s*\\{([^}]+)\\})?'
  );
  private static readonly _quiresRegExp = new RegExp(
    '(\[[^]]+\])?([0-9]+)(?:-([0-9]+))?\\^([0-9]+)(?:([-+])([0-9]+))?(?:\\s*\\{([^}]+)\\})?',
    'g'
  );

  private getQuireFromMatch(match: RegExpExecArray): MsQuire | null {
    return match
      ? {
          tag: match[M_TAG],
          startNr: +match[M_START],
          endNr: match[M_END] ? +match[M_END] : +match[M_START],
          sheetCount: +match[M_COUNT],
          sheetDelta: match[M_DELTA]
            ? match[M_DELTAOP] === '-'
              ? -match[M_DELTA]
              : +match[M_DELTA]
            : 0,
          note: match[M_NOTE],
        }
      : null;
  }

  /**
   * Parse the text representing a quire.
   * @param text The text.
   * @returns Quire or null.
   */
  public parseQuire(text: string | null): MsQuire | null {
    if (!text) {
      return null;
    }
    const m = MsQuiresService.quireRegExp.exec(text);
    return this.getQuireFromMatch(m);
  }

  /**
   * Parse the specified text representing a formula with zero or more quires
   * definitions.
   * @param text The text to be parsed. Each quire is an expression like
   * "*1-3^4~2", where only start number and count are required, separated
   * by whitespace.
   * @returns Array of quires.
   */
  public parseQuires(text: string | null): MsQuire[] {
    if (!text) {
      return [];
    }
    const quires: MsQuire[] = [];
    let match: RegExpExecArray;
    while ((match = MsQuiresService._quiresRegExp.exec(text))) {
      quires.push(this.getQuireFromMatch(match));
    }
    return quires;
  }

  /**
   * Convert the specified quire into a parsable string.
   * @param quire The quire.
   * @returns The string.
   */
  public quireToString(quire: MsQuire): string {
    if (!quire) {
      return '';
    }
    const sb: string[] = [];
    // tag
    if (quire.tag) {
      sb.push('[');
      sb.push(quire.tag);
      sb.push(']');
    }
    // start-end
    sb.push(quire.startNr.toString());
    if (quire.endNr !== quire.startNr) {
      sb.push('-');
      sb.push(quire.endNr.toString());
    }
    // ^count
    sb.push('^');
    sb.push(quire.sheetCount.toString());
    // ±delta
    if (quire.sheetDelta) {
      sb.push(quire.sheetDelta < 0? '-' : '+');
      sb.push(quire.sheetDelta.toString());
    }
    // {note}
    if (quire.note) {
      sb.push(' {');
      sb.push(quire.note);
      sb.push('}');
    }

    return sb.join('');
  }

  /**
   * Convert an array of quires into a parsable string.
   * @param quires The quires.
   * @returns The string.
   */
  public quiresToString(quires: MsQuire[] | null): string {
    if (!quires?.length) {
      return '';
    }
    const sb: string[] = [];

    for (const quire of quires) {
      sb.push(this.quireToString(quire));
    }

    return sb.join(' ');
  }
}
