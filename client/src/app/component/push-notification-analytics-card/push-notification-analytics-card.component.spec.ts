import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushNotificationAnalyticsCardComponent } from './push-notification-analytics-card.component';

describe('PushNotificationAnalyticsCardComponent', () => {
  let component: PushNotificationAnalyticsCardComponent;
  let fixture: ComponentFixture<PushNotificationAnalyticsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushNotificationAnalyticsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushNotificationAnalyticsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
