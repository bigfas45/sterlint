import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddControlDialogComponent } from './add-control-dialog.component';

describe('AddControlDialogComponent', () => {
  let component: AddControlDialogComponent;
  let fixture: ComponentFixture<AddControlDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddControlDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddControlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
