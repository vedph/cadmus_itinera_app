import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MsLayoutFormulaService {
  // formula syntax:
  // 1. N x N: height x width.
  // 2. = N: top-margin.
  // 3. [N]: write-area-height.
  // 4. N x N: bottom-margin x inner-margin.
  // 5. [N/ N (N)?]: for each column: col-N-head-width, col-N-width,
  //    col-N-gap (if this isn't the last column).
  // 6. N: external-margin.
  // e.g. "250 × 170 = 30 [180] 40 × 15 [5/ 52 (20) 5/ 53] 20"

  // The general pattern. This can be also used for validation.
  // 1=height (250)
  // 2=width (170)
  // 3=top-margin (30)
  // 4=write-area-height (180)
  // 5=bottom-margin (40)
  // 6=inner-margin (15)
  // 7=columns... ([5/ 52 (20) 5/ 53]): this is parsed by layColRegexp
  // 8=external-margin (20)
  public static readonly layRegexp = new RegExp(
    // 250 × 170 = 30
    '^\\s*([0-9]+)\\s*[x×]\\s*([0-9]+)\\s*=\\s*([0-9]+)\\s*' +
      // [180] 40 × 15
      '\\[\\s*([0-9]+)\\s*\\]\\s*([0-9]+)\\s*[x×]\\s*([0-9]+)\\s*' +
      // [5/ 52 (20) 5/ 53]
      '(\\[(?:(?:[0-9]+)\\/\\s*(?:[0-9]+)\\s*(?:\\(\\s*(?:[0-9]+)\\s*\\))?\\s*)+\\])?\\s*' +
      // 20
      '([0-9]+)\\s*$'
  );

  // columns pattern
  // [5/ 52 (20) 5/ 53]
  // for each match:
  // 1=col-N-head-width (5)
  // 2=col-N-width (52)
  // 3=col-N-gap (20)
  public static readonly layColRegexp = new RegExp(
    '([0-9]+)\\/\\s*([0-9]+)\\s*(?:\\(\\s*([0-9]+)\\s*\\))?',
    'g'
  );

  constructor() {}

  /**
   * Parse the specified formula representing a manuscript's layout.
   * The formula is like "250 × 170 = 30 [180] 40 × 15 [5/ 52 (20) 5/ 53] 20".
   *
   * @param text The text to parse.
   * @returns A map with keys and value counts.
   */
  public parseFormula(text: string | undefined): Map<string, number> | null {
    if (!text) {
      return null;
    }
    const m = MsLayoutFormulaService.layRegexp.exec(text);
    if (!m) {
      return null;
    }

    const result = new Map();
    result.set('height', +m[1]);
    result.set('width', +m[2]);
    result.set('top-margin', +m[3]);
    result.set('write-area-height', +m[4]);
    result.set('bottom-margin', +m[5]);
    result.set('inner-margin', +m[6]);
    result.set('external-margin', +m[8]);

    // columns
    if (m[7]) {
      let cm: RegExpExecArray;
      let n = 0;
      while ((cm = MsLayoutFormulaService.layColRegexp.exec(m[7]))) {
        const prefix = `col-${++n}-`;
        result.set(prefix + 'head-width', +cm[1]);
        result.set(prefix + 'width', +cm[2]);
        if (cm[3]) {
          result.set(prefix + 'gap', +cm[3]);
        }
      }
    }

    return result;
  }
}
