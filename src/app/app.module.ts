import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ActiveChatComponent } from './active-chat/active-chat.component';
import { MessageComponent } from './message/message.component';
import { PostMessageComponent } from './post-message/post-message.component';


@NgModule({
  declarations: [
    AppComponent,
    ActiveChatComponent,
    MessageComponent,
    PostMessageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
