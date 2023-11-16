import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostaviDaneComponent } from './postavi-dane.component';

describe('PostaviDaneComponent', () => {
  let component: PostaviDaneComponent;
  let fixture: ComponentFixture<PostaviDaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostaviDaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostaviDaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
