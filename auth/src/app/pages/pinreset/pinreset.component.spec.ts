import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinresetComponent } from './pinreset.component';

describe('PinresetComponent', () => {
  let component: PinresetComponent;
  let fixture: ComponentFixture<PinresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinresetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
