import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimaisEditComponent } from './animais-edit.component';

describe('AnimaisEditComponent', () => {
  let component: AnimaisEditComponent;
  let fixture: ComponentFixture<AnimaisEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimaisEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimaisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
