import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUniversiteFilteredComponent } from './list-universite-filtered.component';

describe('ListUniversiteFilteredComponent', () => {
  let component: ListUniversiteFilteredComponent;
  let fixture: ComponentFixture<ListUniversiteFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUniversiteFilteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUniversiteFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
