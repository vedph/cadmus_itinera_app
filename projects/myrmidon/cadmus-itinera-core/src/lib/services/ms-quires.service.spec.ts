import { TestBed } from '@angular/core/testing';

import { MsQuiresService } from './ms-quires.service';

describe('MsQuiresService', () => {
  let service: MsQuiresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsQuiresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // 1^4
  it('parseQuire should parse "1^4"', () => {
    const quire = service.parseQuire('1^4');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeFalse();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(1);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBeFalsy();
  });
  // *1^4
  it('parseQuire should parse "*1^4"', () => {
    const quire = service.parseQuire('*1^4');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeTrue();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(1);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBeFalsy();
  });
  // 1^4 {note}
  it('parseQuire should parse "1^4 {note}"', () => {
    const quire = service.parseQuire('1^4 {note}');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeFalse();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(1);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBe('note');
  });
  // *1^4 {note}
  it('parseQuire should parse "*1^4 {note}"', () => {
    const quire = service.parseQuire('*1^4 {note}');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeTrue();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(1);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBe('note');
  });

  // 1^4~2
  it('parseQuire should parse "1^4~2"', () => {
    const quire = service.parseQuire('1^4~2');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeFalse();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(1);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(2);
    expect(quire.note).toBeFalsy();
  });
  // 1^4±2
  it('parseQuire should parse "1^4±2"', () => {
    const quire = service.parseQuire('1^4±2');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeFalse();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(1);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(2);
    expect(quire.note).toBeFalsy();
  });
  // 1^4~2 {note}
  it('parseQuire should parse "1^4~2 {note}"', () => {
    const quire = service.parseQuire('1^4±2 {note}');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeFalse();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(1);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(2);
    expect(quire.note).toBe('note');
  });

  // 1-3^4
  it('parseQuire should parse "1-3^4"', () => {
    const quire = service.parseQuire('1-3^4');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeFalse();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBeFalsy();
  });
  // *1-3^4
  it('parseQuire should parse "*1-3^4"', () => {
    const quire = service.parseQuire('*1-3^4');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeTrue();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBeFalsy();
  });
  // 1-3^4~2
  it('parseQuire should parse "1-3^4~2"', () => {
    const quire = service.parseQuire('1-3^4~2');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeFalse();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(2);
    expect(quire.note).toBeFalsy();
  });
  // 1-3^4±2
  it('parseQuire should parse "1-3^4±2"', () => {
    const quire = service.parseQuire('1-3^4±2');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeFalse();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(2);
    expect(quire.note).toBeFalsy();
  });
  // 1-3^4 {note}
  it('parseQuire should parse "1-3^4 {note}"', () => {
    const quire = service.parseQuire('1-3^4 {note}');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeFalse();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBe('note');
  });
  // 1-3^4~2 {note}
  it('parseQuire should parse "1-3^4~2 {note}"', () => {
    const quire = service.parseQuire('1-3^4~2 {note}');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeFalse();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(2);
    expect(quire.note).toBe('note');
  });
  // *1-3^4~2 {note}
  it('parseQuire should parse "*1-3^4~2 {note}"', () => {
    const quire = service.parseQuire('*1-3^4~2 {note}');
    expect(quire).toBeTruthy();
    expect(quire.isMain).toBeTrue();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(2);
    expect(quire.note).toBe('note');
  });
});
