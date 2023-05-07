import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdvertComponent } from './manage-advert.component';

describe('ManageAdvertComponent', () => {
  let component: ManageAdvertComponent;
  let fixture: ComponentFixture<ManageAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAdvertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
