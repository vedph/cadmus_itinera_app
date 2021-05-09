import { Injectable } from '@angular/core';

/**
 * A generic wrapper for any object of type T, with an optional
 * error message and payload.
 */
export interface ErrorWrapper<T> {
  error?: {
    message: string;
    payload?: any;
  };
  value?: T;
}

/**
 * A rectangle in a visual representation of a MS layout formula.
 */
export interface MsLayoutRect {
  name: string;
  value: number;
  empty?: boolean;
}

/**
 * Manuscript's layout formula service.
 * Dimensions handled by formula are: height, width,
 * margin-top, head-e or head-w, area-height, foot-w or foot-e, margin-bottom,
 * margin-left, margin-right, col-N-gap, col-N-left-w or col-N-left-e,
 * col-N-width, col-N-right-w or col-N-right-e.
 * https://github.com/vedph/cadmus_itinera_doc/blob/master/models.md#mslayoutspart
 */
@Injectable({
  providedIn: 'root',
})
export class MsLayoutService {
  // sections: HxW=HxW
  // [1]=height
  // [2]=width
  // [3]=...height details
  // [4]=...width details
  private static readonly _sectRegex = new RegExp(
    '^(\\d+)[Xx×](\\d+)=([^Xx×]+)[Xx×](.+)$'
  );

  // height:
  // [1] = margin-top
  // [2] = head-e or
  // [3] = head-w
  // [4] = area-height
  // [5] = foot-w or
  // [6] = foot-e
  // [7] = margin-bottom
  private static readonly _heightRegex = new RegExp(
    //N    (     /N[          or  [N/          )N     (     /N]          or  ]N/          )N
    '(\\d+)(?:(?:\\/(\\d+)\\[)|(?:\\[(\\d+)\\/))(\\d+)(?:(?:\\/(\\d+)\\])|(?:\\](\\d+)\\/))(\\d+)'
  );

  // width: edges (margin-left, margin right) and gap
  // N /
  private static readonly _wmlRegex = new RegExp('^(\\d+)/');
  // / N
  private static readonly _wmrRegex = new RegExp('/(\\d+)$');
  // N[
  private static readonly _wEmptyFirstRegex = new RegExp('^\\d+\\[');
  // ]N
  private static readonly _wEmptyLastRegex = new RegExp('\\]\\d+');
  // N N N in column
  private static readonly _lwrKeys = ['left', 'width', 'right'];
  // col-N-
  private static readonly _colNRegex = new RegExp('^col-(\\d+)-');

  constructor() {}

  private parseHeightMatch(
    m: RegExpExecArray,
    result: Map<string, number>
  ): void {
    result.set('margin-top', +m[1]);
    if (m[2]) {
      result.set('head-e', +m[2]);
    }
    if (m[3]) {
      result.set('head-w', +m[3]);
    }
    result.set('area-height', +m[4]);
    if (m[5]) {
      result.set('foot-w', +m[5]);
    }
    if (m[6]) {
      result.set('foot-e', +m[6]);
    }
    result.set('margin-bottom', +m[7]);
  }

  private parseColumn(
    col: string,
    coln: number,
    result: Map<string, number>
  ): string | undefined {
    // first N is empty if N[
    const firstEmpty = MsLayoutService._wEmptyFirstRegex.test(col);
    // last N is empty if ]N
    const lastEmpty = MsLayoutService._wEmptyLastRegex.test(col);
    // process col's 3 N or N* (empty)
    const nRegex = /(\d+)(\*?)/g;
    let m: RegExpExecArray;
    let n = 0;

    while ((m = nRegex.exec(col))) {
      if (++n > 3) {
        return 'Too many numbers in column #' + coln + ': ' + col;
      }
      const empty =
        (firstEmpty && n === 1) || (lastEmpty && n === 3) || m[2] === '*';
      let key = `col-${coln}-` + MsLayoutService._lwrKeys[n - 1];
      if (n !== 2) {
        key += empty ? '-e' : '-w';
      }
      result.set(key, +m[1]);
    }

    return undefined;
  }

  /**
   * Parse the specified layout formula.
   *
   * @param text The text to parse.
   * @returns A map with key=dimension name and value=its numeric value,
   * wrapped inside an error wrapper. In case of errors, the wrapper has
   * its error object and a null map.
   */
  public parseFormula(text?: string | null): ErrorWrapper<Map<string, number>> {
    if (!text) {
      return { value: null };
    }
    // remove whitespaces
    text = text.replace(/\s+/g, '');

    // match main sections
    const m = MsLayoutService._sectRegex.exec(text);
    if (!m) {
      return {
        error: {
          message: 'Invalid formula (expected H x W = height x width)',
        },
      };
    }

    // total height and width
    const result = new Map();
    result.set('height', +m[1]);
    result.set('width', +m[2]);

    // height details
    const hm = MsLayoutService._heightRegex.exec(m[3]);
    if (!hm) {
      return {
        error: {
          message: 'Invalid height details',
          payload: m[3],
        },
      };
    }
    this.parseHeightMatch(hm, result);

    // width details:
    // read margin-left and margin-right from edges
    const ml = MsLayoutService._wmlRegex.exec(m[4]);
    if (!ml) {
      return {
        error: {
          message: 'Missing left margin in width details',
          payload: m[4],
        },
      };
    }
    result.set('margin-left', +ml[1]);

    const mr = MsLayoutService._wmrRegex.exec(m[4]);
    if (!mr) {
      return {
        error: {
          message: 'Missing right margin in width details',
          payload: m[4],
        },
      };
    }
    result.set('margin-right', +mr[1]);

    // strip margins thus getting columns only
    let cols = m[4].substr(ml[0].length, mr.index - ml[0].length);

    // for each gap (which separates two columns), process
    // the left portion as a column
    const gapRegex = /\((\d+)\)/g;
    let mGap: RegExpExecArray;
    let start = 0;
    let coln = 0;
    while ((mGap = gapRegex.exec(cols))) {
      coln++;
      result.set(`col-${coln}-gap`, +mGap[1]);
      const col = cols.substr(start, mGap.index - start);
      const err = this.parseColumn(col, coln, result);
      if (err) {
        return {
          error: {
            message: err,
            payload: col,
          },
        };
      }
      start = mGap.index + mGap[0].length;
    }

    // process the last column if pending
    if (start < cols.length) {
      const err = this.parseColumn(cols.substr(start), ++coln, result);
      if (err) {
        return {
          error: {
            message: err,
            payload: cols,
          },
        };
      }
    }

    return {
      value: result,
    };
  }

  private getRects(map: Map<string, number>, keys: string[]): MsLayoutRect[] {
    const rects: MsLayoutRect[] = [];
    keys.forEach((key) => {
      if (map.has(key)) {
        rects.push({
          name: key,
          value: map.get(key),
          empty:
            key.endsWith('-e') ||
            key.endsWith('-gap') ||
            key.startsWith('margin-'),
        });
      }
    });
    return rects;
  }

  /**
   * Get the array of rectangles representing the dimensions parsed from
   * a formula along the sheet's height.
   *
   * @param map The map of dimensions as parsed by parseFormula.
   * @returns An array of rectangles.
   */
  public getHeightRects(map: Map<string, number>): MsLayoutRect[] {
    return this.getRects(map, [
      'margin-top',
      'head-e',
      'head-w',
      'area-height',
      'foot-e',
      'foot-w',
      'margin-bottom',
    ]);
  }

  /**
   * Get the count of columns in the specified map.
   *
   * @param map The map of dimensions as parsed by parseFormula.
   * @returns The count of columns.
   */
  public getColumnCount(map: Map<string, number>): number {
    let colMax = 0;
    map.forEach((value, key) => {
      const m = MsLayoutService._colNRegex.exec(key);
      if (m) {
        const n = +m[1];
        if (n > colMax) {
          colMax = n;
        }
      }
    });
    return colMax;
  }

  /**
   * Get the array of rectangles representing the dimensions parsed from
   * a formula along the sheet's width.
   *
   * @param map The map of dimensions as parsed by parseFormula.
   * @returns An array of rectangles.
   */
  public getWidthRects(map: Map<string, number>): MsLayoutRect[] {
    const keys: string[] = [];
    keys.push('margin-left');

    const colCount = this.getColumnCount(map);
    for (let n = 1; n <= colCount; n++) {
      if (n > 1) {
        keys.push(`col-${n}-gap`);
      }
      keys.push(`col-${n}-left-e`);
      keys.push(`col-${n}-left-w`);
      keys.push(`col-${n}-width`);
      keys.push(`col-${n}-right-e`);
      keys.push(`col-${n}-right-w`);
    }

    keys.push('margin-right');
    return this.getRects(map, keys);
  }
}
