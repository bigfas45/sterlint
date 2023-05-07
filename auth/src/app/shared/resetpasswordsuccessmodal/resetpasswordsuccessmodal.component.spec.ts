import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordsuccessmodalComponent } from './resetpasswordsuccessmodal.component';

describe('ResetpasswordsuccessmodalComponent', () => {
  let component: ResetpasswordsuccessmodalComponent;
  let fixture: ComponentFixture<ResetpasswordsuccessmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetpasswordsuccessmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordsuccessmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
