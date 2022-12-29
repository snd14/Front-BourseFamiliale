import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportParBureauComponent } from './rapport-par-bureau.component';

describe('RapportParBureauComponent', () => {
  let component: RapportParBureauComponent;
  let fixture: ComponentFixture<RapportParBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportParBureauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportParBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
