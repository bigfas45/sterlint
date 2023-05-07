import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfStatesComponent } from './list-of-states.component';

describe('ListOfStatesComponent', () => {
  let component: ListOfStatesComponent;
  let fixture: ComponentFixture<ListOfStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfStatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
