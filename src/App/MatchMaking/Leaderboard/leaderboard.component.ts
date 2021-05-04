import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../Profile/state/user.state';
import {Observable} from 'rxjs';
import {UserModel} from '../shared/user.model';
import {ListenForUsers} from '../Profile/state/user.actions';
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  @Select(UserState.users) users$: Observable<UserModel[]> | undefined;
  @Select(UserState.sortUsersByRating) sortUsers$: Observable<UserModel[]> | undefined;


  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ListenForUsers());

  }

}
