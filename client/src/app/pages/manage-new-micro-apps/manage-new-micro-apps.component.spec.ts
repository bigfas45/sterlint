import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNewMicroAppsComponent } from './manage-new-micro-apps.component';

describe('ManageNewMicroAppsComponent', () => {
  let component: ManageNewMicroAppsComponent;
  let fixture: ComponentFixture<ManageNewMicroAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNewMicroAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageNewMicroAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
