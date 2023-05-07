import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWebAdvertDisplayComponent } from './manage-web-advert-display.component';

describe('ManageWebAdvertDisplayComponent', () => {
  let component: ManageWebAdvertDisplayComponent;
  let fixture: ComponentFixture<ManageWebAdvertDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageWebAdvertDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageWebAdvertDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
