import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActiveChatComponent } from './active-chat/active-chat.component';
import { DisplayMessageComponent } from './display-message/display-message.component';
import { PostMessageComponent } from './post-message/post-message.component';
import { HeadingImageComponent } from './heading-image/heading-image.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from './services/message.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ActiveChatComponent,
        DisplayMessageComponent,
        PostMessageComponent,
        HeadingImageComponent
      ],
      imports: [FormsModule,
        ReactiveFormsModule],
      providers: [MessageService],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
