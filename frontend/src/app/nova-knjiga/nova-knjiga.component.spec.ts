import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaKnjigaComponent } from './nova-knjiga.component';

describe('NovaKnjigaComponent', () => {
  let component: NovaKnjigaComponent;
  let fixture: ComponentFixture<NovaKnjigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaKnjigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaKnjigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
