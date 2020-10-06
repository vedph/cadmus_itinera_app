import { TestBed } from '@angular/core/testing';

import { CadmusItineraPartMsPgService } from './cadmus-itinera-part-ms-pg.service';

describe('CadmusItineraPartMsPgService', () => {
  let service: CadmusItineraPartMsPgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadmusItineraPartMsPgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
