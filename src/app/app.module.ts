import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { ActiveChatComponent } from './active-chat/active-chat.component';
import { DisplayMessageComponent } from './display-message/display-message.component';
import { PostMessageComponent } from './post-message/post-message.component';
import { HeadingImageComponent} from './heading-image/heading-image.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MessageService} from './services/message.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ActiveChatComponent,
    DisplayMessageComponent,
    PostMessageComponent,
    HeadingImageComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]

})
export class AppModule { }
