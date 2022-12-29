import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportParAgentComponent } from './rapport-par-agent.component';

describe('RapportParAgentComponent', () => {
  let component: RapportParAgentComponent;
  let fixture: ComponentFixture<RapportParAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportParAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportParAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
