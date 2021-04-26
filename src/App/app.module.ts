import {Injectable, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {Socket} from 'ngx-socket-io';
import {FlexLayoutModule} from '@angular/flex-layout';




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

],
  bootstrap: [AppComponent]
})
export class AppModule { }
