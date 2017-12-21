import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DisplayMessageComponent} from './display-message.component';
import {MessageService} from '../services/message.service';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('MessageComponent', () => {
  let component: DisplayMessageComponent;
  let fixture: ComponentFixture<DisplayMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [DisplayMessageComponent],
      providers: [MessageService, HttpClient, HttpHandler],
    });

    fixture = TestBed.createComponent(DisplayMessageComponent);
    component = fixture.componentInstance;
  }));

  it('should create DisplayMessageComponent', () => {
    expect(component).toBeTruthy();
  });
});

