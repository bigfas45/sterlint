import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFeatureDialogComponent } from './delete-feature-dialog.component';

describe('DeleteFeatureDialogComponent', () => {
  let component: DeleteFeatureDialogComponent;
  let fixture: ComponentFixture<DeleteFeatureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFeatureDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFeatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
