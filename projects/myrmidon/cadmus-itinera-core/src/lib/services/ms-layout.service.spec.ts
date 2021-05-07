import { TestBed } from '@angular/core/testing';

import { MsLayoutService } from './ms-layout.service';

describe('MsLayoutService', () => {
  let service: MsLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
