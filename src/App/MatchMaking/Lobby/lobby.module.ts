import {NgModule} from '@angular/core';
import {LobbyRoutingModule} from './lobby-routing.module';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {LobbyComponent} from './lobby.component';


@NgModule({
  declarations: [
    LobbyComponent,
  ],

  imports: [
    LobbyRoutingModule,
    FlexModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatOptionModule,
    MatSelectModule,
  ]
})
export class LobbyModule {
}
