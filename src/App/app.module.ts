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
import { LoginComponent } from './MatchMaking/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from "@angular/forms";
import {ChatState} from "./MatchMaking/Chat/state/chat.state";
import {LoginState} from './MatchMaking/login/state/login.state';

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
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: [ChatState, LoginState, UserState]
    }),
    ReactiveFormsModule
  ],
  providers: [SocketApp],
  bootstrap: [AppComponent]
})
export class AppModule { }
