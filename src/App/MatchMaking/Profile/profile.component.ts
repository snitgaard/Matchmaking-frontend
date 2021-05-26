import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from './state/user.state';
import {Observable, Subject} from 'rxjs';
import {ListenForUsers, StopListeningForUsers} from './state/user.actions';
import {takeUntil} from 'rxjs/operators';
import {LoginState} from '../login/state/login.state';
import {LoadUserFromStorage, RemoveUserFromStorage} from '../login/state/login.actions';
import {
  JoinLobby,
  ListenForJoinedMatch,
  ListenForMatches,
  ListenForMatchFound,
  ListenForMatchResults,
  ListenForNewMatchCreated,
} from '../Lobby/state/match.actions';
import {MatchState} from '../Lobby/state/match.state';
import {FormBuilder} from '@angular/forms';
import {MatchResultsModel} from '../shared/match-results.model';
import {UserModel} from '../shared/user.model';


@Component({
  selector: 'app-chat',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {
  @Select(UserState.users) users$: Observable<UserModel[]> | undefined;
  @Select(MatchState.matchResults) matchResults$: Observable<MatchResultsModel[]> | undefined;
  @Select(LoginState.loggedInUser) loggedInUser$: Observable<UserModel> | undefined;

  unsubscribe$ = new Subject();
  relevantResults: MatchResultsModel[] = [];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch([new ListenForUsers(), new ListenForMatches(),
      new ListenForNewMatchCreated(), new ListenForJoinedMatch(), new ListenForMatchFound(), new ListenForMatchResults()]);
    this.store.dispatch(new LoadUserFromStorage());
    this.getMatchHistory();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopListeningForUsers());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  queueUp(): void {
    this.store.dispatch(new JoinLobby(this.store.selectSnapshot(LoginState.loggedInUser)));
  }

  getMatchHistory(): void {
    const loggedInUser = {...this.store.selectSnapshot(LoginState.loggedInUser)};
    this.matchResults$.pipe(takeUntil(this.unsubscribe$)).subscribe((matchResults) => {
      matchResults.forEach(relevantResult => {
        const index = this.relevantResults.findIndex(result => result.id === relevantResult.id);
        if (relevantResult.user.id === loggedInUser.id && index === -1) {
          this.relevantResults.push(relevantResult);
        }
      });
    });
  }

  logout(): void {
    this.store.dispatch(new RemoveUserFromStorage);
  }

}
