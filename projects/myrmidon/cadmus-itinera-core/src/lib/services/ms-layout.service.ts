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
  // 3 sections: HxW=HxW
  // [1]=height
  // [2]=width
  // [3]=height details
  // [4]=width details
  public static readonly sectRegex = new RegExp(
    '^(\\d+)[Xx×](\\d+)=([^Xx×]+)[Xx×](.+)$'
  );
  // height details:
  // [1] = margin-top
  // [2] = head-e or
  // [3] = head-w
  // [4] = area-height
  // [5] = foot-w or
  // [6] = foot-e
  // [7] = margin-bottom
  private static readonly _heightRegex = new RegExp(
    '(\\d+)(?:(?:\\/(\\d+)\\[)|(?:\\[(\\d+)\\/))(\\d+)(?:(?:\\/(\\d+)\\])|(?:\\](\\d+)\\/))(\\d+)'
  );

  // [1] = margin-left
  // [2] = col-1-left-e
  // [3] = col-1-left-w
  // [4] = col-1-width
  // [5] = col-1-right-w
  // [6] = col-1-right-e
  private static readonly _width1Regex = new RegExp(
    '^(\\d+)(?:(?:\\/(\\d+)\\[)|(?:\\[(\\d+)\\/))(\\d+)(?:(?:\\/(\\d+))|(?:\\/(\\d+)\\*))'
  );

  // [1] = col-N-gap
  // [2] = col-N-left-w
  // [3] = col-N-left-e
  // [4] = col-N-width
  // [5] = col-N-right-w
  // [6] = col-N-right-e
  private static readonly _width2Regex = new RegExp(
    '^(?:\\((\\d+)\\)(?:(?:(\\d+))|(?:(\\d+)\\*))\\/(\\d+)(?:(?:\\/(\\d+))|(?:\\/(\\d+)\\*)))*'
  );

  // [1] = col-N-gap
  // [2] = col-N-left-w
  // [3] = col-N-left-e
  // [4] = col-N-right-w
  // [5] = col-N-right-e
  // [6] = right-margin
  private static readonly _width3Regex = new RegExp(
    '^(?:\\((\\d+)\\)(?:(?:(\\d+))|(?:(\\d+)\\*))\\/(\\d+)(?:(?:\\/(\\d+)\\])|(?:\\]\\/(\\d+)))\\/(\\d+)'
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

  /**
   * Parse the specified layout formula.
   *
   * @param text The text to parse.
   * @returns A map with key=dimension name and value=its numeric value.
   */
  public parseFormula(
    text?: string | null
  ): ErrorWrapper<Map<string, number>> | null {
    if (!text) {
      return null;
    }
    // remove whitespaces
    text = text.replace(' ', '');

    // match main sections
    const m = MsLayoutService.sectRegex.exec(text);
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

    // width details
    const wm1 = MsLayoutService._width1Regex.exec(m[4]);
    if (!wm1) {
      return {
        error: {
          message: 'Invalid width first column details',
          payload: m[4],
        },
      };
    }
    // TODO

    let i = wm1.length;
    let s = m[4].substr(i);
    const wm2 = MsLayoutService._width2Regex.exec(s);
    if (!wm2) {
      return {
        error: {
          message: 'Invalid width mid column(s) details',
          payload: s,
        },
      };
    }
    // TODO

    i += wm2.length;
    s = m[4].substr(i);
    const wm3 = MsLayoutService._width2Regex.exec(s);
    if (!wm3) {
      return {
        error: {
          message: 'Invalid width last column details',
          payload: s,
        },
      };
    }
    // TODO

    return {
      value: result,
    };
  }
}
