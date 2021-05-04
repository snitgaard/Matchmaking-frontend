import {NgModule} from '@angular/core';
import {LeaderboardComponent} from './leaderboard.component';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {LeaderboardRoutingModule} from './leaderboard-routing.module';
import {CommonModule} from "@angular/common";
import {NgxsModule} from "@ngxs/store";
import {UserState} from "../Profile/state/user.state";



@NgModule({
  declarations: [
    LeaderboardComponent,
  ],

  imports: [
    LeaderboardRoutingModule,
    FlexModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    NgxsModule.forFeature([UserState]),
    CommonModule
  ]
})
export class LeaderboardModule { }
