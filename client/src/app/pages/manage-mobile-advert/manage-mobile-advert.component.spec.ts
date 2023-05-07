import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMobileAdvertComponent } from './manage-mobile-advert.component';

describe('ManageMobileAdvertComponent', () => {
  let component: ManageMobileAdvertComponent;
  let fixture: ComponentFixture<ManageMobileAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMobileAdvertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMobileAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
