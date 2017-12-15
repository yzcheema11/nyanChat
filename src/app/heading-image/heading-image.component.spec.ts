import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingImageComponent } from './heading-image.component';

describe('HeadingImageComponent', () => {
  let component: HeadingImageComponent;
  let fixture: ComponentFixture<HeadingImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadingImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
