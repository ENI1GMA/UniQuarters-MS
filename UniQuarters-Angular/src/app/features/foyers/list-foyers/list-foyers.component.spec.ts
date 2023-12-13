import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoyersComponent } from './list-foyers.component';

describe('ListFoyersComponent', () => {
  let component: ListFoyersComponent;
  let fixture: ComponentFixture<ListFoyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFoyersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFoyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
