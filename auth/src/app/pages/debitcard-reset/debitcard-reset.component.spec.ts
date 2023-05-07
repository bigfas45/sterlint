import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcardResetComponent } from './debitcard-reset.component';

describe('DebitcardResetComponent', () => {
  let component: DebitcardResetComponent;
  let fixture: ComponentFixture<DebitcardResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitcardResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitcardResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
