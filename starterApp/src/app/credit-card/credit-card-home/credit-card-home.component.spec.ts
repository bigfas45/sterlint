import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardHomeComponent } from './credit-card-home.component';

describe('CreditCardHomeComponent', () => {
  let component: CreditCardHomeComponent;
  let fixture: ComponentFixture<CreditCardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
