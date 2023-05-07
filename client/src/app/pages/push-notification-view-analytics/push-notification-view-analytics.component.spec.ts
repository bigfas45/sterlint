import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushNotificationViewAnalyticsComponent } from './push-notification-view-analytics.component';

describe('PushNotificationViewAnalyticsComponent', () => {
  let component: PushNotificationViewAnalyticsComponent;
  let fixture: ComponentFixture<PushNotificationViewAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushNotificationViewAnalyticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushNotificationViewAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
