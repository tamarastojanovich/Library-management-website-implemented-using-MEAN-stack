import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledZaduzenihComponent } from './pregled-zaduzenih.component';

describe('PregledZaduzenihComponent', () => {
  let component: PregledZaduzenihComponent;
  let fixture: ComponentFixture<PregledZaduzenihComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledZaduzenihComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledZaduzenihComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
