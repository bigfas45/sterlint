import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRestpasswordpageComponent } from './new-restpasswordpage.component';

describe('NewRestpasswordpageComponent', () => {
  let component: NewRestpasswordpageComponent;
  let fixture: ComponentFixture<NewRestpasswordpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRestpasswordpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRestpasswordpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
