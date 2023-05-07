import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBanksComponent } from './list-of-banks.component';

describe('ListOfBanksComponent', () => {
  let component: ListOfBanksComponent;
  let fixture: ComponentFixture<ListOfBanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfBanksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
