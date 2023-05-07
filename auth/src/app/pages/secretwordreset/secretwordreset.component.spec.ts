import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretwordresetComponent } from './secretwordreset.component';

describe('SecretwordresetComponent', () => {
  let component: SecretwordresetComponent;
  let fixture: ComponentFixture<SecretwordresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretwordresetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretwordresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
