import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostaviDaneZadComponent } from './postavi-dane-zad.component';

describe('PostaviDaneZadComponent', () => {
  let component: PostaviDaneZadComponent;
  let fixture: ComponentFixture<PostaviDaneZadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostaviDaneZadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostaviDaneZadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
