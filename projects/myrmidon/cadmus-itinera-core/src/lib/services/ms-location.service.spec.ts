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
    expect(l.nr).toBe(36);
    expect(l.rv).toBe('r');
    expect(l.ln).toBe(12);
  });

  it('should parse 36v12', () => {
    const l = service.parseLocation('36v12');
    expect(l).toBeTruthy();
    expect(l.nr).toBe(36);
    expect(l.rv).toBe('v');
    expect(l.ln).toBe(12);
  });

  it('should parse 36r', () => {
    const l = service.parseLocation('36r');
    expect(l).toBeTruthy();
    expect(l.nr).toBe(36);
    expect(l.rv).toBe('r');
    expect(l.ln).toBe(0);
  });

  it('should parse 36 as null', () => {
    const l = service.parseLocation('36');
    expect(l).toBeNull();
  });
});
