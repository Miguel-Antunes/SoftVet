import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietariosFormComponent } from './proprietarios-form.component';

describe('ProprietariosFormComponent', () => {
  let component: ProprietariosFormComponent;
  let fixture: ComponentFixture<ProprietariosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietariosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
