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

  //          H     W   | tm   he ah   fw  bm | ml   clw  cw   cre cg2 clw2 cw2 cre2 mr
  let text = '240 × 150 = 30 / 5 [170 / 5] 40 × 15 / [5 / 50 / 5* (20) 5* / 40] 5 / 15';
  it('should parse ' + text, () => {
    const r = service.parseFormula(text);
    expect(r.error).toBeFalsy();
    expect(r.value).toBeTruthy();
    // TODO
  });
});
