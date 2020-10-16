import { Injectable } from '@angular/core';
import { MsLocation } from '../models';

/**
 * Service for parsing and stringifying a MsLocation.
 */
@Injectable({
  providedIn: 'root',
})
export class MsLocationService {
  private readonly _locRegexp = new RegExp(
    '^\\s*(\\d+)([rv])\\s*(\\d+)?\\s*$',
    'i'
  );

  /**
   * Parse the text representing a MsLocation, in the form
   * nr + rv + optional whitespace + ln, like "36r 12".
   *
   * @param text The text to be parsed.
   * @returns The location, or null if invalid text.
   */
  public parseLocation(text: string): MsLocation | null {
    if (!text) {
      return null;
    }

    const m = this._locRegexp.exec(text);
    if (!m) {
      return null;
    }
    return {
      nr: +m[1],
      rv: m[2],
      ln: m[3] ? +m[3] : 0,
    };
  }

  /**
   * Convert the specified MsLocation into a string, parsable
   * with parseLocation.
   *
   * @param location The location. If null, null is returned.
   * @returns String with form nr + rv + optional whitespace + ln,
   * like "36r 12"
   */
  public locationToString(location: MsLocation | null): string | null {
    if (!location) {
      return null;
    }
    return (
      `${location.nr}${location.rv}` + (location.ln ? ` ${location.ln}` : '')
    );
  }
}
