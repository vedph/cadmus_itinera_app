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
    expect(quire.tag).toBeFalsy();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(1);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBeFalsy();
  });
  // *1^4
  it('parseQuire should parse "[tag]1^4"', () => {
    const quire = service.parseQuire('[tag]1^4');
    expect(quire).toBeTruthy();
    expect(quire.tag).toBe('tag');
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
    expect(quire.tag).toBeFalsy();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(1);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBe('note');
  });
  // *1^4 {note}
  it('parseQuire should parse "[tag]1^4 {note}"', () => {
    const quire = service.parseQuire('[tag]1^4 {note}');
    expect(quire).toBeTruthy();
    expect(quire.tag).toBe('tag');
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(1);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBe('note');
  });

  // 1^4+2
  it('parseQuire should parse "1^4+2"', () => {
    const quire = service.parseQuire('1^4+2');
    expect(quire).toBeTruthy();
    expect(quire.tag).toBeFalsy();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(1);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(2);
    expect(quire.note).toBeFalsy();
  });
  // 1^4-2
  it('parseQuire should parse "1^4-2"', () => {
    const quire = service.parseQuire('1^4-2');
    expect(quire).toBeTruthy();
    expect(quire.tag).toBeFalsy();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(1);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(-2);
    expect(quire.note).toBeFalsy();
  });
  // 1^4+2 {note}
  it('parseQuire should parse "1^4+2 {note}"', () => {
    const quire = service.parseQuire('1^4+2 {note}');
    expect(quire).toBeTruthy();
    expect(quire.tag).toBeFalsy();
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
    expect(quire.tag).toBeFalsy();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBeFalsy();
  });
  // *1-3^4
  it('parseQuire should parse "[tag]1-3^4"', () => {
    const quire = service.parseQuire('[tag]1-3^4');
    expect(quire).toBeTruthy();
    expect(quire.tag).toBe('tag');
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBeFalsy();
  });
  // 1-3^4+2
  it('parseQuire should parse "1-3^4+2"', () => {
    const quire = service.parseQuire('1-3^4+2');
    expect(quire).toBeTruthy();
    expect(quire.tag).toBeFalsy();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(2);
    expect(quire.note).toBeFalsy();
  });
  // 1-3^4-2
  it('parseQuire should parse "1-3^4-2"', () => {
    const quire = service.parseQuire('1-3^4-2');
    expect(quire).toBeTruthy();
    expect(quire.tag).toBeFalsy();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(-2);
    expect(quire.note).toBeFalsy();
  });
  // 1-3^4 {note}
  it('parseQuire should parse "1-3^4 {note}"', () => {
    const quire = service.parseQuire('1-3^4 {note}');
    expect(quire).toBeTruthy();
    expect(quire.tag).toBeFalsy();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBe('note');
  });
  // 1-3^4+2 {note}
  it('parseQuire should parse "1-3^4+2 {note}"', () => {
    const quire = service.parseQuire('1-3^4+2 {note}');
    expect(quire).toBeTruthy();
    expect(quire.tag).toBeFalsy();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(2);
    expect(quire.note).toBe('note');
  });
  // [tag]1-3^4+2 {note}
  it('parseQuire should parse "[tag]1-3^4+2 {note}"', () => {
    const quire = service.parseQuire('[tag]1-3^4+2 {note}');
    expect(quire).toBeTruthy();
    expect(quire.tag).toBe('tag');
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(2);
    expect(quire.note).toBe('note');
  });

  it('parseQuires should parse multiple quires', () => {
    const quires = service.parseQuires('1-3^4+1 [tag]4-7^4 {a note}');
    expect(quires.length).toBe(2);

    let quire = quires[0];
    expect(quire.tag).toBeFalsy();
    expect(quire.startNr).toBe(1);
    expect(quire.endNr).toBe(3);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(1);
    expect(quire.note).toBeFalsy();

    quire = quires[1];
    expect(quire.tag).toBe('tag');
    expect(quire.startNr).toBe(4);
    expect(quire.endNr).toBe(7);
    expect(quire.sheetCount).toBe(4);
    expect(quire.sheetDelta).toBe(0);
    expect(quire.note).toBe('a note');
  });
});
