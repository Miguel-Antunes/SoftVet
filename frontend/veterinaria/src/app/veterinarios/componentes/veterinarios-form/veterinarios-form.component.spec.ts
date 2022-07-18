import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinariosFormComponent } from './veterinarios-form.component';

describe('VeterinariosFormComponent', () => {
  let component: VeterinariosFormComponent;
  let fixture: ComponentFixture<VeterinariosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeterinariosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
