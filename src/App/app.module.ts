import {Injectable, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Socket} from 'ngx-socket-io';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from './MatchMaking/popup/popup.component';




@Injectable()
export class SocketUser extends Socket {

  constructor() {
    super({url: 'http://localhost:1337', options: {}});
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,

  ],

imports: [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FlexLayoutModule,
  MatDialogModule,
],

  bootstrap: [AppComponent]
})
export class AppModule { }
