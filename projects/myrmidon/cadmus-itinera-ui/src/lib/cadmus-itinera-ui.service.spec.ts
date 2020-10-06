import { TestBed } from '@angular/core/testing';

import { CadmusItineraUiService } from './cadmus-itinera-ui.service';

describe('CadmusItineraUiService', () => {
  let service: CadmusItineraUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadmusItineraUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
