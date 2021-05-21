import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProfileComponent} from '../Profile/profile.component';
import {MatchModel} from '../shared/match.model';
import {MatchState} from './state/match.state';
import {Observable, Subject} from 'rxjs';
import {LoginState} from '../login/state/login.state';
import {takeUntil} from 'rxjs/operators';
import {MatchResultsModel} from '../shared/match-results.model';
import {
  GetUsersOnMatch,
  ListenForMatchResults,
  NewMatch,
  NewMatchResult,
  UpdateMatchResult
} from './state/match.actions';
import {ListenForUsers, UpdateUser} from '../Profile/state/user.actions';
import {UserModel} from '../shared/user.model';
import {LoggedInUserUpdate} from '../login/state/login.actions';


@Component({
  selector: 'app-chat',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit
{
  @Select(MatchState.currentMatch) currentMatch$: Observable<MatchModel> | undefined;
  @Select(LoginState.loggedInUser) loggedInUser$: Observable<UserModel> | undefined;
  @Select(MatchState.currentMatchResults) currentMatchResults$: Observable<MatchResultsModel> | undefined;

  winOrLoseFb = this.fb.group({
    player1: [''],
    player2: [''],
  });

  selectedResult: MatchResultsModel;

  constructor(private store: Store, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.store.dispatch([new ListenForMatchResults(), new NewMatch(), new NewMatchResult(), new GetUsersOnMatch()]);
  }

  winOrLose(): void {
    const player1Value = this.winOrLoseFb.value.player1;
    const player2Value = this.winOrLoseFb.value.player2;

  }

  endMatch(): void {
    const resultToUpdate = this.selectedResult;
    resultToUpdate.result = true;
    this.store.dispatch(new UpdateMatchResult(resultToUpdate));
    /*const winnerToUpdate = this.selectedResult.user;
    const currentMatch = {...this.store.selectSnapshot(MatchState.currentMatch)};
    const matchResults = currentMatch.matchResults;
    matchResults.forEach(result => {
      if (result.user !== winnerToUpdate) {
        result.user.rating = result.user.rating - 10;
      } else {
        result.user.rating = result.user.rating + 10;
      }
      this.store.dispatch(new UpdateUser(result.user));
    });*/
  }
}
