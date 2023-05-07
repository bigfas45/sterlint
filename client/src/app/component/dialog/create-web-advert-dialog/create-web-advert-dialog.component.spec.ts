import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWebAdvertDialogComponent } from './create-web-advert-dialog.component';

describe('CreateWebAdvertDialogComponent', () => {
  let component: CreateWebAdvertDialogComponent;
  let fixture: ComponentFixture<CreateWebAdvertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWebAdvertDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWebAdvertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
