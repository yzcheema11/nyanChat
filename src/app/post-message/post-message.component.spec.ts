import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostMessageComponent} from './post-message.component';
import {MessageService} from '../services/message.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('PostMessageComponent', () => {
  let component: PostMessageComponent;
  let fixture: ComponentFixture<PostMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostMessageComponent],
      providers: [MessageService, HttpClient, HttpHandler],
      imports: [FormsModule, ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(PostMessageComponent);
    component = fixture.componentInstance;
  }));

  it('should create PostMessageComponent', () => {
    expect(component).toBeTruthy();
  });
});
