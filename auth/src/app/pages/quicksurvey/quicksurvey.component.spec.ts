import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicksurveyComponent } from './quicksurvey.component';

describe('QuicksurveyComponent', () => {
  let component: QuicksurveyComponent;
  let fixture: ComponentFixture<QuicksurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuicksurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuicksurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
