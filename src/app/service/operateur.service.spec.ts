import { TestBed } from '@angular/core/testing';

import { OperateurService } from './operateur.service';

describe('OperateurService', () => {
  let service: OperateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
