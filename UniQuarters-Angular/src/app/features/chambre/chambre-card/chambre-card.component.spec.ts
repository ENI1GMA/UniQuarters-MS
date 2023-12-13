import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambreCardComponent } from './chambre-card.component';

describe('ChambreCardComponent', () => {
  let component: ChambreCardComponent;
  let fixture: ComponentFixture<ChambreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChambreCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
