import { TestBed } from '@angular/core/testing';

import { MsLocationService } from './ms-location.service';

describe('MsLocationService', () => {
  let service: MsLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse 36r12', () => {
    const l = service.parseLocation('36r12');
    expect(l).toBeTruthy();
    expect(l.n).toBe(36);
    expect(l.v).toBe('r');
    expect(l.l).toBe(12);
  });

  it('should parse 36v12', () => {
    const l = service.parseLocation('36v12');
    expect(l).toBeTruthy();
    expect(l.n).toBe(36);
    expect(l.v).toBe('v');
    expect(l.l).toBe(12);
  });

  it('should parse 36r', () => {
    const l = service.parseLocation('36r');
    expect(l).toBeTruthy();
    expect(l.n).toBe(36);
    expect(l.v).toBe('r');
    expect(l.l).toBe(0);
  });

  it('should parse 36 as null', () => {
    const l = service.parseLocation('36');
    expect(l).toBeNull();
  });
});
