import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchModel} from '../shared/match.model';
import {MatchState} from './state/match.state';
import {Observable, Subject} from 'rxjs';
import {LoginState} from '../login/state/login.state';
import {MatchResultsModel} from '../shared/match-results.model';
import {
  GetUsersOnMatch,
  ListenForMatchResults,
  NewMatch,
  NewMatchResult,
  UpdateMatchResult
} from './state/match.actions';
import {UserModel} from '../shared/user.model';


@Component({
  selector: 'app-chat',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit, OnDestroy {
  @Select(MatchState.currentMatch) currentMatch$: Observable<MatchModel> | undefined;
  @Select(LoginState.loggedInUser) loggedInUser$: Observable<UserModel> | undefined;
  @Select(MatchState.currentMatchResults) currentMatchResults$: Observable<MatchResultsModel[]> | undefined;

  winOrLoseFb = this.fb.group({
    player1: [''],
    player2: [''],
  });

  selectedResult: MatchResultsModel;
  unsubscribe$ = new Subject();

  constructor(private store: Store, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {

    this.store.dispatch([new ListenForMatchResults(), new NewMatch(), new NewMatchResult(), new GetUsersOnMatch()]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  endMatch(): void {
    this.store.dispatch(new UpdateMatchResult(this.selectedResult));
  }


}
