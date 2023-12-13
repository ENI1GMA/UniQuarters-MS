import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversiteLocationComponent } from './universite-location.component';

describe('UniversiteLocationComponent', () => {
  let component: UniversiteLocationComponent;
  let fixture: ComponentFixture<UniversiteLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversiteLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversiteLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
