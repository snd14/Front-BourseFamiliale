import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportDrpComponent } from './rapport-drp.component';

describe('RapportDrpComponent', () => {
  let component: RapportDrpComponent;
  let fixture: ComponentFixture<RapportDrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportDrpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportDrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
