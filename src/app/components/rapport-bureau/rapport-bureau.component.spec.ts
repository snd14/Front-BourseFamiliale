import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportBureauComponent } from './rapport-bureau.component';

describe('RapportBureauComponent', () => {
  let component: RapportBureauComponent;
  let fixture: ComponentFixture<RapportBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportBureauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
