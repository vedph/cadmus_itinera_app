import { Injectable } from '@angular/core';
import { MsQuire } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MsQuiresService {
  // sample:
  // *1-3^4~2 {note here}
  // where:
  // [1]=[main]
  // [2]=start
  // [3]=[end]
  // [4]=count
  // [5]=[delta]
  // [6]=[note]
  public static readonly quireRegExp = new RegExp(
    '(\\*)?([0-9]+)(?:-([0-9]+))?\\^([0-9]+)(?:[~±]([0-9]+))?(?:\\s*\\{([^}]+)\\})?'
  );
  private static readonly _quiresRegExp = new RegExp(
    '(\\*)?([0-9]+)(?:-([0-9]+))?\\^([0-9]+)(?:[~±]([0-9]+))?(?:\\s*\\{([^}]+)\\})?',
    'g'
  );

  private getQuireFromMatch(match: RegExpExecArray): MsQuire | null {
    return match
      ? {
          isMain: match[1] ? true : false,
          startNr: +match[2],
          endNr: match[3] ? +match[3] : +match[2],
          sheetCount: +match[4],
          sheetDelta: match[5] ? +match[5] : 0,
          note: match[6],
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
    // main
    if (quire.isMain) {
      sb.push('*');
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
      sb.push('±');
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
