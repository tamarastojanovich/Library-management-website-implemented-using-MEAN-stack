import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajKomentarComponent } from './azuriraj-komentar.component';

describe('AzurirajKomentarComponent', () => {
  let component: AzurirajKomentarComponent;
  let fixture: ComponentFixture<AzurirajKomentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajKomentarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajKomentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
