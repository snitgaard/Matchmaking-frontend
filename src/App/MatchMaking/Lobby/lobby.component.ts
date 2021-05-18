import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {ProfileComponent} from '../Profile/profile.component';
import {MatchModel} from '../shared/match.model';
import {MatchState} from './state/match.state';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit
{
  @Select(MatchState.activeMatch) activeMatch$: Observable<MatchModel> | undefined;
  activeMatch: MatchModel;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.activeMatch =  {...this.store.selectSnapshot(MatchState.activeMatch)};
    console.log("gay", this.activeMatch);
  }

}
