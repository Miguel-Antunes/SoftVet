import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietariosListComponent } from './proprietarios-list.component';

describe('ProprietariosListComponent', () => {
  let component: ProprietariosListComponent;
  let fixture: ComponentFixture<ProprietariosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietariosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietariosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
