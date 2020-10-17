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
  public static readonly quireRegexp = new RegExp(
    '(\\*)?([0-9]+)(?:-([0-9]+))?\\^([0-9]+)(?:[~±]([0-9]+))?(?:\\s*\\{([^}]+)\\})?',
    'gi'
  );

  /**
   * Parse the text representing a quire.
   * @param text The text.
   * @returns Quire or null.
   */
  public parseQuire(text: string | null): MsQuire | null {
    if (!text) {
      return null;
    }
    const m = MsQuiresService.quireRegexp.exec(text);
    return m
      ? {
          isMain: m[1] ? true : false,
          startNr: +m[2],
          endNr: m[3] ? +m[3] : +m[2],
          sheetCount: +m[4],
          sheetDelta: m[5] ? +m[5] : 0,
          note: m[6],
        }
      : null;
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
    for (const token of text.split(/\s+/)) {
      const quire = this.parseQuire(token);
      if (quire) {
        quires.push(quire);
      }
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
