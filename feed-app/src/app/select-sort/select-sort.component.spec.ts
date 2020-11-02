import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSortComponent } from './select-sort.component';

describe('SelectSortComponent', () => {
  let component: SelectSortComponent;
  let fixture: ComponentFixture<SelectSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
