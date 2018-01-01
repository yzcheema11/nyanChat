import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordofthedayComponent } from './wordoftheday.component';

describe('WordofthedayComponent', () => {
  let component: WordofthedayComponent;
  let fixture: ComponentFixture<WordofthedayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordofthedayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordofthedayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
