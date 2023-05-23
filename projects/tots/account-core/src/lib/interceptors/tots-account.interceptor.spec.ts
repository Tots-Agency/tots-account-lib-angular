import { TestBed } from '@angular/core/testing';

import { TotsAccountInterceptor } from './tots-account.interceptor';

describe('TotsAccountInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TotsAccountInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TotsAccountInterceptor = TestBed.inject(TotsAccountInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
