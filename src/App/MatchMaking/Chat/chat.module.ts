import {NgModule} from '@angular/core';
import {ChatComponent} from './chat.component';
import {AppRoutingModule} from '../../app-routing.module';
import {ChatRoutingModule} from './chat-routing.module';



@NgModule({
  declarations: [
    ChatComponent,
  ],

  imports: [
    ChatRoutingModule
  ]
})
export class ChatModule { }
