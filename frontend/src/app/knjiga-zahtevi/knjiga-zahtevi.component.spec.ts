import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjigaZahteviComponent } from './knjiga-zahtevi.component';

describe('KnjigaZahteviComponent', () => {
  let component: KnjigaZahteviComponent;
  let fixture: ComponentFixture<KnjigaZahteviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnjigaZahteviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnjigaZahteviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
