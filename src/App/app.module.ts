import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {NavbarComponent} from './MatchMaking/shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],

imports: [
  BrowserModule,
  AppRoutingModule

],
  bootstrap: [AppComponent]
})
export class AppModule { }
