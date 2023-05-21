import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCoreComponent } from './account-core.component';

describe('AccountCoreComponent', () => {
  let component: AccountCoreComponent;
  let fixture: ComponentFixture<AccountCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
