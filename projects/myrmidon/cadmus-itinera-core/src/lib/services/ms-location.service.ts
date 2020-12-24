import { Injectable } from '@angular/core';
import { RomanNumber } from '@myrmidon/cadmus-core';
import { MsLocation, MsLocationSides } from '../models';

/**
 * Service for parsing and stringifying a MsLocation.
 */
@Injectable({
  providedIn: 'root',
})
export class MsLocationService {
  public static readonly locRegexp = new RegExp(
    '^\\s*([0-9]+|[IVX]+)(r|v|rv)\\s*([0-9]+)?\\s*$'
  );
  public static readonly locsRegexp = new RegExp(
    '^(?:([0-9]+|[IVX]+)(r|v|rv)\\s*([0-9]+)?\\s*)*$'
  );

  private parseSides(text: string): MsLocationSides {
    switch (text) {
      case 'r':
        return MsLocationSides.Recto;
      case 'v':
        return MsLocationSides.Verso;
      case 'rv':
        return MsLocationSides.RectoAndVerso;
      default:
        return MsLocationSides.Undefined;
    }
  }

  /**
   * Parse the text representing a MsLocation, in the form
   * nr + rv + optional whitespace + ln, like "36r 12",
   * where nr can be either Arabic or Roman (uppercase).
   *
   * @param text The text to be parsed.
   * @returns The location, or null if invalid text.
   */
  public parseLocation(text: string): MsLocation | null {
    if (!text) {
      return null;
    }

    const m = MsLocationService.locRegexp.exec(text);
    if (!m) {
      return null;
    }

    // n
    let n = 0;
    let r: boolean;

    if (m[1][0] >= '0' && m[1][0] <= '9') {
      n = +m[1];
      r = false;
    } else {
      n = RomanNumber.fromRoman(m[1]);
      r = true;
    }

    return {
      n,
      r,
      s: this.parseSides(m[2]),
      l: m[3] ? +m[3] : 0,
    };
  }

  /**
   * Convert the specified MsLocation into a string, parsable
   * with parseLocation.
   *
   * @param location The location. If null, null is returned.
   * @returns String with form nr + rv + ln, like "36r12", "IIrv13", etc.
   */
  public locationToString(location: MsLocation | null): string | null {
    if (!location || location.n === null || location.n === undefined) {
      return null;
    }
    const sb: string[] = [];
    if (location.r) {
      sb.push(RomanNumber.toRoman(location.n));
    } else {
      sb.push(location.n.toString());
    }

    if (location.s & MsLocationSides.Recto) {
      sb.push('r');
    }
    if (location.s & MsLocationSides.Verso) {
      sb.push('v');
    }

    if (location.l) {
      sb.push(location.l.toString());
    }
    return sb.join('');
  }
}
