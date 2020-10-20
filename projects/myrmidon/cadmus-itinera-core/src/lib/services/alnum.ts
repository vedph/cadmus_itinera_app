/**
 * A number with an optional alphanumeric tail.
 * Such alphanumeric is either a number (a string with only digits),
 * or at least 1 digit followed by any combination of digit or non-digit
 * characters. These alphanumerics are sorted according to the following
 * criteria:
 * - an alphanumeric with only digits (e.g. `12`) is sorted by its numeric
 * value.
 * - an alphanumeric with non-digit characters (e.g. `12a`, `12b1`, etc.)
 * is sorted first by its numeric value, and then alphabetically by
 * its string suffix.
 */
export class Alnum {
  private static readonly _alnumRegExp = new RegExp('([0-9]+)([^-\\s]*)');

  public n: number;
  public a?: string | null;

  constructor(n = 0, a: string = null) {
    this.n = n;
    this.a = a;
  }

  public static parse(text: string | null): Alnum | null {
    if (!text) {
      return null;
    }
    const m = Alnum._alnumRegExp.exec(text);
    return m ? new Alnum(+m[1], m[2] ? m[2] : null) : null;
  }

  public toString(): string {
    return this.a ? `${this.n}${this.a}` : this.n.toString();
  }

  /**
   * Compare this alphanumeric to the other one.
   * @param other The other alphanumeric.
   * @returns 0=equal, 1=this > other, -1=this < other.
   */
  public compare(other: Alnum | null): number {
    if (!other) {
      return 1;
    }
    if (this.n !== other.n) {
      return this.n - other.n;
    }
    if (!this.a && !other.a) {
      return 0;
    }
    if (this.a && !other.a) {
      return 1;
    }
    if (!this.a && other.a) {
      return -1;
    }
    return this.a.localeCompare(other.a);
  }
}
