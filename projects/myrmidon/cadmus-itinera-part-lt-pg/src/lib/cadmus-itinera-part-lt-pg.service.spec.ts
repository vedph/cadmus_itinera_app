import { TestBed } from '@angular/core/testing';

import { CadmusItineraPartLtPgService } from './cadmus-itinera-part-lt-pg.service';

describe('CadmusItineraPartLtPgService', () => {
  let service: CadmusItineraPartLtPgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadmusItineraPartLtPgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
