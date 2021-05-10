import { TestBed } from '@angular/core/testing';

import { MsLayoutService } from './ms-layout.service';

fdescribe('MsLayoutService', () => {
  let service: MsLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse empty as null', () => {
    const r = service.parseFormula('');
    expect(r.error).toBeFalsy();
    expect(r.value).toBeNull();
  });

  //          H     W   | mt   he ah   fw  mb | ml   clw  cw   cre cg2 clw2cw2 cre2 mr
  let text = '250 × 160 = 30 / 5 [170 / 5] 40 × 15 / [5 / 50 / 5* (20) 5 / 40] 5 / 15';
  it('should parse ' + text, () => {
    const r = service.parseFormula(text);
    expect(r.error).toBeFalsy();
    expect(r.value).toBeTruthy();

    const map: Map<string,number> = r.value;
    // height, width
    expect(map.get('height')).toBe(250);
    expect(map.get('width')).toBe(160);
    // height details
    expect(map.get('margin-top')).toBe(30);
    expect(map.get('head-e')).toBe(5);
    expect(map.get('area-height')).toBe(170);
    expect(map.get('foot-w')).toBe(5);
    expect(map.get('margin-bottom')).toBe(40);
    // width details
    expect(map.get('margin-left')).toBe(15);
    expect(map.get('col-1-left-w')).toBe(5);
    expect(map.get('col-1-width')).toBe(50);
    expect(map.get('col-1-right-e')).toBe(5);
    expect(map.get('col-1-gap')).toBe(20);
    expect(map.get('col-2-left-w')).toBe(5);
    expect(map.get('col-2-width')).toBe(40);
    expect(map.get('col-2-right-e')).toBe(5);
    expect(map.get('margin-right')).toBe(15);
  });

  it('should count 2 cols in ' + text, () => {
    const r = service.parseFormula(text);
    expect(r.error).toBeFalsy();
    expect(r.value).toBeTruthy();
    expect(service.getColumnCount(r.value)).toBe(2);
  });

  it('should get height rects from ' + text, () => {
    const r = service.parseFormula(text);
    expect(r.error).toBeFalsy();
    expect(r.value).toBeTruthy();
    const rects = service.getHeightRects(r.value);
    expect(rects.length).toBe(5);
    expect(rects[0].name).toBe('margin-top');
    expect(rects[1].name).toBe('head-e');
    expect(rects[2].name).toBe('area-height');
    expect(rects[3].name).toBe('foot-w');
    expect(rects[4].name).toBe('margin-bottom');
    expect(rects.reduce((a,b) => {
      return a + b.value;
    }, 0)).toBe(250);
  });

  it('should get width rects from ' + text, () => {
    const r = service.parseFormula(text);
    expect(r.error).toBeFalsy();
    expect(r.value).toBeTruthy();
    const rects = service.getWidthRects(r.value);
    expect(rects.length).toBe(9);
    expect(rects[0].name).toBe('margin-left');
    expect(rects[1].name).toBe('col-1-left-w');
    expect(rects[2].name).toBe('col-1-width');
    expect(rects[3].name).toBe('col-1-right-e');
    expect(rects[4].name).toBe('col-1-gap');
    expect(rects[5].name).toBe('col-2-left-w');
    expect(rects[6].name).toBe('col-2-width');
    expect(rects[7].name).toBe('col-2-right-e');
    expect(rects[8].name).toBe('margin-right');
    expect(rects.reduce((a,b) => {
      return a + b.value;
    }, 0)).toBe(160);
  });
});