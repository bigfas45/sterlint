import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMobileAdvertCreateNewComponent } from './manage-mobile-advert-create-new.component';

describe('ManageMobileAdvertCreateNewComponent', () => {
  let component: ManageMobileAdvertCreateNewComponent;
  let fixture: ComponentFixture<ManageMobileAdvertCreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMobileAdvertCreateNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMobileAdvertCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
