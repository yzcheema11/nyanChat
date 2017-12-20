///<reference path="../services/message.service.ts"/>
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DisplayMessageComponent} from './display-message.component';
import {MessageService} from '../services/message.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('MessageComponent', () => {
  let component: DisplayMessageComponent;
  let fixture: ComponentFixture<DisplayMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayMessageComponent],
      providers: [MessageService],
      imports: [FormsModule, ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
