import {NgModule} from '@angular/core';
import {LobbyComponent} from './lobby.component';
import {LobbyRoutingModule} from './lobby-routing.module';



@NgModule({
  declarations: [
    LobbyComponent,
  ],

  imports: [
    LobbyRoutingModule
  ]
})
export class LobbyModule { }
