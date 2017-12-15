import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActiveChatComponent } from './active-chat/active-chat.component';
import { MessageComponent } from './message/message.component';
import { PostMessageComponent } from './post-message/post-message.component';
import { HeadingImageComponent } from './heading-image/heading-image.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessagesService} from './services/messages.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ActiveChatComponent,
        MessageComponent,
        PostMessageComponent,
        HeadingImageComponent
      ],
      imports: [FormsModule,
        ReactiveFormsModule],
      providers: [MessagesService],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('NyanChat');
  }));
});
