import {NgModule} from '@angular/core';
import {ChatComponent} from './chat.component';
import {AppRoutingModule} from '../../app-routing.module';
import {ChatRoutingModule} from './chat-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FlexModule} from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [
    ChatComponent,
  ],

  imports: [
    ChatRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FlexModule,
    MatDividerModule,
    MatListModule
  ]
})
export class ChatModule { }
