import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessboxComponent } from './successbox.component';

describe('SuccessboxComponent', () => {
  let component: SuccessboxComponent;
  let fixture: ComponentFixture<SuccessboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
