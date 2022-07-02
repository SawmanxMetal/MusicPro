import { TestBed } from '@angular/core/testing';

import { ProductcarService } from './productcar.service';

describe('ProductcarService', () => {
  let service: ProductcarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductcarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
