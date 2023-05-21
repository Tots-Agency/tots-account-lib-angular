import { TestBed } from '@angular/core/testing';

import { TotsAccountResolver } from './tots-account.resolver';

describe('TotsAccountResolver', () => {
  let resolver: TotsAccountResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TotsAccountResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
