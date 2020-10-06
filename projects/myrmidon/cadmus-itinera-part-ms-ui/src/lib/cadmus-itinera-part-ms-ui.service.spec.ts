import { TestBed } from '@angular/core/testing';

import { CadmusItineraPartMsUiService } from './cadmus-itinera-part-ms-ui.service';

describe('CadmusItineraPartMsUiService', () => {
  let service: CadmusItineraPartMsUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadmusItineraPartMsUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
