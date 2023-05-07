import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteControlDialogComponent } from './delete-control-dialog.component';

describe('DeleteControlDialogComponent', () => {
  let component: DeleteControlDialogComponent;
  let fixture: ComponentFixture<DeleteControlDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteControlDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteControlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
