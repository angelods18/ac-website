import { TestBed } from '@angular/core/testing';

import { IncontroService } from './incontro.service';

describe('IncontroService', () => {
  let service: IncontroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncontroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
