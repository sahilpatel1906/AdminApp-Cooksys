import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectcompanyComponent } from './selectcompany.component';

describe('SelectcompanyComponent', () => {
  let component: SelectcompanyComponent;
  let fixture: ComponentFixture<SelectcompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectcompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
