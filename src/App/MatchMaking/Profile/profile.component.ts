import {Component, OnDestroy, OnInit} from '@angular/core';
import {ofActionSuccessful, Select, Store} from '@ngxs/store';
import {UserState} from './state/user.state';
import {Observable, Subject} from 'rxjs';
import {UserModel} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {ListenForUsers, StopListeningForUsers} from './state/user.actions';
import {takeUntil} from 'rxjs/operators';
import {LoginState} from '../login/state/login.state';
import {RemoveUserFromStorage} from '../login/state/login.actions';


@Component({
  selector: 'app-chat',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy
{
  @Select(UserState.users) users$: Observable<UserModel[]> | undefined;
  @Select(LoginState.loggedInUser) loggedInUser$: Observable<UserModel> | undefined;

  unsubscribe$ = new Subject();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new ListenForUsers());
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.store.dispatch(new StopListeningForUsers())
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout(): void {
    this.store.dispatch(new RemoveUserFromStorage)
  }
}
