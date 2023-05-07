import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBranchesComponent } from './list-of-branches.component';

describe('ListOfBranchesComponent', () => {
  let component: ListOfBranchesComponent;
  let fixture: ComponentFixture<ListOfBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfBranchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
