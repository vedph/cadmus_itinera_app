import { TestBed } from '@angular/core/testing';

import { MsLayoutFormulaService } from './ms-layout-formula.service';

fdescribe('MsLayoutFormulaService', () => {
  let service: MsLayoutFormulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsLayoutFormulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  let text = '250 × 170 = 30 [180] 40 × 15 [5/ 52 (21) 6/ 53] 20';
  it('should parse ' + text, () => {
    const map = service.parseFormula(text);
    expect(map).toBeTruthy();
    expect(map.get('height')).toBe(250);
    expect(map.get('width')).toBe(170);
    expect(map.get('top-margin')).toBe(30);
    expect(map.get('write-area-height')).toBe(180);
    expect(map.get('bottom-margin')).toBe(40);
    expect(map.get('inner-margin')).toBe(15);
    expect(map.get('external-margin')).toBe(20);

    // columns
    expect(map.get('col-1-head-width')).toBe(5);
    expect(map.get('col-1-width')).toBe(52);
    expect(map.get('col-1-gap')).toBe(21);

    expect(map.get('col-2-head-width')).toBe(6);
    expect(map.get('col-2-width')).toBe(53);
    expect(map.get('col-2-gap')).toBeFalsy();
  });

  text = '250×170=30 [180] 40×15 [5/ 52 (21) 6/ 53] 20';
  it('should parse ' + text, () => {
    const map = service.parseFormula(text);
    expect(map).toBeTruthy();
    expect(map.get('height')).toBe(250);
    expect(map.get('width')).toBe(170);
    expect(map.get('top-margin')).toBe(30);
    expect(map.get('write-area-height')).toBe(180);
    expect(map.get('bottom-margin')).toBe(40);
    expect(map.get('inner-margin')).toBe(15);
    expect(map.get('external-margin')).toBe(20);

    // columns
    expect(map.get('col-1-head-width')).toBe(5);
    expect(map.get('col-1-width')).toBe(52);
    expect(map.get('col-1-gap')).toBe(21);

    expect(map.get('col-2-head-width')).toBe(6);
    expect(map.get('col-2-width')).toBe(53);
    expect(map.get('col-2-gap')).toBeFalsy();
  });

  text = '250 × 170 = 30 [180] 40 × 15 [5/ 52 (21)] 20';
  it('should parse ' + text, () => {
    const map = service.parseFormula(text);
    expect(map).toBeTruthy();
    expect(map.get('height')).toBe(250);
    expect(map.get('width')).toBe(170);
    expect(map.get('top-margin')).toBe(30);
    expect(map.get('write-area-height')).toBe(180);
    expect(map.get('bottom-margin')).toBe(40);
    expect(map.get('inner-margin')).toBe(15);
    expect(map.get('external-margin')).toBe(20);

    // columns
    expect(map.get('col-1-head-width')).toBe(5);
    expect(map.get('col-1-width')).toBe(52);
    expect(map.get('col-1-gap')).toBe(21);
  });
});
