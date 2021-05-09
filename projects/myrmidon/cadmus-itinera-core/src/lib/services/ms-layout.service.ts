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
 * Manuscript's layout formula service.
 * https://github.com/vedph/cadmus_itinera_doc/blob/master/models.md#mslayoutspart
 */
@Injectable({
  providedIn: 'root',
})
export class MsLayoutService {
  // sections: HxW=HxW
  // [1]=height
  // [2]=width
  // [3]=height details
  // [4]=width details
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

  // width: column 1
  // [1] = margin-left
  // [2] = col-1-left-e or
  // [3] = col-1-left-w
  // [4] = col-1-width
  // [5] = col-1-right-w or
  // [6] = col-1-right-e
  private static readonly _width1Regex = new RegExp(
    //N     (     /N[          or  [N/          )N     (     /N        or  /N*          )
    '^(\\d+)(?:(?:\\/(\\d+)\\[)|(?:\\[(\\d+)\\/))(\\d+)(?:(?:\\/(\\d+))|(?:\\/(\\d+)\\*))'
  );

  // width: mid columns
  // [1] = col-N-gap
  // [2] = col-N-left-w or
  // [3] = col-N-left-e
  // [4] = col-N-width
  // [5] = col-N-right-w or
  // [6] = col-N-right-e
  private static readonly _width2Regex = new RegExp(
    //{ (N)         (     N  or  N*        )/N       (     /N        or  /N*          )}
    '(?:\\((\\d+)\\)(?:(\\d+)|(?:(\\d+)\\*))\\/(\\d+)(?:(?:\\/(\\d+))|(?:\\/(\\d+)\\*)))*',
    'g'
  );

  // width: last column
  // [1] = col-N-gap
  // [2] = col-N-left-w or
  // [3] = col-N-left-e
  // [4] = col-N-width
  // [5] = col-N-right-w or
  // [6] = col-N-right-e
  // [7] = margin-right
  private static readonly _width3Regex = new RegExp(
    //(N)        (  N      or N*        )/N       (     /N]          or  ]/N          )/N
    '\\((\\d+)\\)(?:(\\d+)|(?:(\\d+)\\*))\\/(\\d+)(?:(?:\\/(\\d+)\\])|(?:\\]\\/(\\d+)))\\/(\\d+)$'
  );

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

  private parseWidth1Match(
    m: RegExpExecArray,
    result: Map<string, number>
  ): void {
    result.set('margin-left', +m[1]);
    if (m[2]) {
      result.set('col-1-left-e', +m[2]);
    }
    if (m[3]) {
      result.set('col-1-left-w', +m[3]);
    }
    result.set('col-1-width', +m[4]);
    if (m[5]) {
      result.set('col-1-right-w', +m[5]);
    }
    if (m[6]) {
      result.set('col-1-right-e', +m[6]);
    }
  }

  private parseWidth2Match(
    m: RegExpExecArray,
    n: number,
    result: Map<string, number>
  ): void {
    result.set(`col-${n}-gap`, +m[1]);
    if (m[2]) {
      result.set(`col-${n}-left-w`, +m[2]);
    }
    if (m[3]) {
      result.set(`col-${n}-left-e`, +m[3]);
    }
    result.set(`col-${n}-width`, +m[4]);
    if (m[5]) {
      result.set(`col-${n}-right-w`, +m[5]);
    }
    if (m[6]) {
      result.set(`col-${n}-right-e`, +m[6]);
    }
  }

  private parseWidth3Match(
    m: RegExpExecArray,
    n: number,
    result: Map<string, number>
  ): void {
    this.parseWidth2Match(m, n, result);
    result.set(`margin-right`, +m[1]);
  }

  /**
   * Parse the specified layout formula.
   *
   * @param text The text to parse.
   * @returns A map with key=dimension name and value=its numeric value.
   */
  public parseFormula(
    text?: string | null
  ): ErrorWrapper<Map<string, number>> {
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
    // first column
    const wm1 = MsLayoutService._width1Regex.exec(m[4]);
    if (!wm1) {
      return {
        error: {
          message: 'Invalid width first column details',
          payload: m[4],
        },
      };
    }
    this.parseWidth1Match(wm1, result);

    // mid columns
    let i = wm1.length;
    let s = m[4].substr(i);
    let col = 1;
    let wm2: RegExpExecArray;
    while ((wm2 = MsLayoutService._width2Regex.exec(s))) {
      this.parseWidth2Match(wm2, ++col, result);
    }
    if (col === 1) {
      return {
        error: {
          message: 'Invalid width mid column(s) details',
          payload: s,
        },
      };
    }

    // last column
    i += wm2.length;
    s = m[4].substr(i);
    const wm3 = MsLayoutService._width3Regex.exec(s);
    if (!wm3) {
      return {
        error: {
          message: 'Invalid width last column details',
          payload: s,
        },
      };
    }
    this.parseWidth3Match(wm3, col, result);

    return {
      value: result,
    };
  }
}
