import {NgModule} from '@angular/core';
import {LobbyComponent} from './lobby.component';
import {LobbyRoutingModule} from './lobby-routing.module';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [
    LobbyComponent,
  ],

    imports: [
        LobbyRoutingModule,
        CommonModule
    ]
})
export class LobbyModule { }
