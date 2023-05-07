import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdvertCreateNewComponent } from './manage-advert-create-new.component';

describe('ManageAdvertCreateNewComponent', () => {
  let component: ManageAdvertCreateNewComponent;
  let fixture: ComponentFixture<ManageAdvertCreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAdvertCreateNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAdvertCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
