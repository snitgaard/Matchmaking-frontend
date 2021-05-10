import {Component, OnDestroy, OnInit} from '@angular/core';
import {ofActionSuccessful, Select, Store} from '@ngxs/store';
import {UserState} from './state/user.state';
import {Observable, Subject} from 'rxjs';
import {UserModel} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {ListenForUsers, StopListeningForUsers, UpdateUser, UpdateUsers} from './state/user.actions';
import {takeUntil} from 'rxjs/operators';
import {LoginState} from '../login/state/login.state';
import {LoadUserFromStorage, RemoveUserFromStorage} from '../login/state/login.actions';
import {AuthUserModel} from '../shared/auth-user.model';
import {ListenForMatches} from "../Lobby/state/match.actions";
import {MatchModel} from "../shared/match.model";
import {MatchState} from "../Lobby/state/match.state";


@Component({
  selector: 'app-chat',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy
{
  @Select(UserState.users) users$: Observable<UserModel[]> | undefined;
  @Select(MatchState.matches) matches$: Observable<MatchModel[]> | undefined;
  @Select(LoginState.loggedInUser) loggedInUser$: Observable<AuthUserModel> | undefined;
  // loggedInUser: AuthUserModel;

  unsubscribe$ = new Subject();
  queuedUsers: UserModel[] = [];
  matchFound: boolean;
  testUser: UserModel[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new ListenForUsers());
    this.store.dispatch(new ListenForMatches());
    // this.store.dispatch(new LoadUserFromStorage());
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.store.dispatch(new StopListeningForUsers());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  queueUp(): void {
    const user = {...this.store.selectSnapshot(LoginState.loggedInUser)};
    user.inQueue = !user.inQueue;
    this.store.dispatch(new UpdateUser(user));
    this.users$.subscribe((users) => {
      users.forEach(queuedUser => {
        if (queuedUser.id === user.id)
        {
          return;
        }
        if (queuedUser.inQueue === true)
        {
          this.queuedUsers.push(queuedUser);
          console.log(queuedUser);
        }
      });
    });
    console.log(this.queuedUsers);
    if(this.queuedUsers.length > 0)
    {
      const firstUser = this.queuedUsers[0];
      this.testUser.push(firstUser);
      this.matchFound = true;
      console.log(this.testUser);
    }
  logout(): void {
    this.store.dispatch(new RemoveUserFromStorage);
  }
}
