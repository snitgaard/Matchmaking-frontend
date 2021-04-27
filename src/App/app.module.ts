import {Injectable, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {Socket} from 'ngx-socket-io';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoginComponent } from './MatchMaking/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';




@Injectable()
export class SocketUser extends Socket {

  constructor() {
    super({url: 'http://localhost:1337', options: {}});
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
