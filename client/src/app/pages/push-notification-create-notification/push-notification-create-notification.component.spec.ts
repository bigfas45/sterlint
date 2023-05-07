import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushNotificationCreateNotificationComponent } from './push-notification-create-notification.component';

describe('PushNotificationCreateNotificationComponent', () => {
  let component: PushNotificationCreateNotificationComponent;
  let fixture: ComponentFixture<PushNotificationCreateNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushNotificationCreateNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushNotificationCreateNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
