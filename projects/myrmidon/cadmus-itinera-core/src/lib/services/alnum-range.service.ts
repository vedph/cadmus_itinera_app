import { Injectable } from '@angular/core';
import { AlnumRange } from '../models';
import { Alnum } from './alnum';

@Injectable({
  providedIn: 'root',
})
export class AlnumRangeService {
  public static readonly rangeRegExp = new RegExp(
    '([0-9]+[^-\\s,]*)(?:-([0-9]+[^-\\s,]*))?'
  );
  private static readonly _rangesRegExp = new RegExp(
    '([0-9]+[^-\\s,]*)(?:-([0-9]+[^-\\s,]*))?',
    'g'
  );

  private getRangeFromMatch(match: RegExpExecArray): AlnumRange | null {
    return match
      ? {
          a: match[1],
          b: match[2] ? match[2] : match[1],
        }
      : null;
  }

  /**
   * Parse the specified text representing a range.
   * @param text The text.
   * @returns Range or null.
   */
  public parseRange(text: string | null): AlnumRange | null {
    if (!text) {
      return null;
    }
    const m = AlnumRangeService.rangeRegExp.exec(text);
    return this.getRangeFromMatch(m);
  }

  /**
   * Parse the specified text representing a list of ranges.
   * @param text The text.
   * @returns Array of ranges.
   */
  public parseRanges(text: string | null): AlnumRange[] {
    if (!text) {
      return [];
    }
    const ranges: AlnumRange[] = [];
    let match: RegExpExecArray;
    while ((match = AlnumRangeService._rangesRegExp.exec(text))) {
      ranges.push(this.getRangeFromMatch(match));
    }
    return ranges;
  }

  /**
   * Convert the specified range to a string.
   * @param range The range or null.
   * @returns The string.
   */
  public rangeToString(range: AlnumRange | null): string {
    if (!range?.a) {
      return '';
    }

    if (!range.b || range.b === range.a) {
      return range.a;
    }

    const sb: string[] = [];
    sb.push(range.a);
    sb.push('-');
    sb.push(range.b);

    return sb.join('');
  }

  /**
   * Convert an array of ranges into a parsable string.
   * @param ranges The ranges.
   * @returns The string.
   */
  public rangesToString(ranges: AlnumRange[] | null): string {
    if (!ranges?.length) {
      return '';
    }
    const sb: string[] = [];

    for (const range of ranges) {
      sb.push(this.rangeToString(range));
    }

    return sb.join(' ');
  }

  public expandRanges(ranges: AlnumRange[]): string[] {
    const expanded: string[] = [];

    for (const r of ranges) {
      if (r.b && r.b !== r.a) {
        const first = Alnum.parse(r.a);
        const last = Alnum.parse(r.b);

        // a range cannot include an A part;
        // in this case, expand as two different single ranges
        if (first.a || last.a) {
          expanded.push(first.toString());
          expanded.push(last.toString());
        } else {
          for (let n = first.n; n <= last.n; n++) {
            expanded.push(n.toString());
          }
        }
      } else {
        expanded.push(r.a);
      }
    }

    return expanded;
  }
}
