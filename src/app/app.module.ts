import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
import { ActiveChatComponent } from './active-chat/active-chat.component';
import { MessageComponent } from './message/message.component';
import { PostMessageComponent } from './post-message/post-message.component';
import { HeadingImageComponent} from './heading-image/heading-image.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MessagesService} from './services/messages.service';
import {HttpClientModule} from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ActiveChatComponent,
    MessageComponent,
    PostMessageComponent,
    HeadingImageComponent,
    SidebarComponent,
    UsersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MessagesService],
  bootstrap: [AppComponent]

})
export class AppModule { }
