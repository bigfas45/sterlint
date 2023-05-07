import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualRequestComponent } from './virtual-request.component';

describe('VirtualRequestComponent', () => {
  let component: VirtualRequestComponent;
  let fixture: ComponentFixture<VirtualRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
