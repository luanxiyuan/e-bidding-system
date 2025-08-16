import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BwicService } from './bwic.service';

describe('BwicService', () => {
  let service: BwicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BwicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
