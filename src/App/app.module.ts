import {Injectable, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {Socket, SocketIoModule} from 'ngx-socket-io';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {UserState} from './MatchMaking/Profile/state/user.state';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';



@Injectable()
export class SocketApp extends Socket {

  constructor() {
    super({url: 'http://localhost:3300', options: {}});
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
  SocketIoModule,
  NgxsModule.forRoot([], {
    developmentMode: !environment.production
  }),
  NgxsLoggerPluginModule.forRoot(),
  NgxsReduxDevtoolsPluginModule.forRoot(),
  NgxsStoragePluginModule.forRoot({
    key: UserState
  })
],
  providers: [SocketApp],

  bootstrap: [AppComponent]
})
export class AppModule { }
