import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamEstimationComponent } from './add-team-estimation.component';

describe('AddTeamEstimationComponent', () => {
  let component: AddTeamEstimationComponent;
  let fixture: ComponentFixture<AddTeamEstimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeamEstimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
