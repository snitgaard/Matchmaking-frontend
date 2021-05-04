import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';

import {Subscription} from 'rxjs';
import {UserModel} from '../../shared/user.model';
import {UserService} from '../../shared/user.service';
import {LoginService} from '../../shared/login.service';
import {ListenForLogin, LoadUserFromStorage, RemoveUserFromStorage, UserLoggedIn} from './login.actions';
import {AuthUserModel} from '../../shared/auth-user.model';
import {tap} from 'rxjs/operators';
import {patch, removeItem} from '@ngxs/store/operators';


export interface UserStateModel {
  Users: UserModel[];
  loggedInUser: AuthUserModel | undefined;
}

@State<UserStateModel>({
  name: 'login',
  defaults: {
    Users: [],
    loggedInUser: undefined,
  }
})
@Injectable()
export class LoginState {
  private usersUnsub: Subscription | undefined;

  constructor(private userService: UserService, private loginService: LoginService) {
  }

  @Selector()
  static users(state: UserStateModel): UserModel[] {
    return state.Users;
  }

  @Selector()
  static userIds(state: UserStateModel): string[] {
    return state.Users.map(c => c.id);
  }

  @Selector()
  static loggedInUser(state: UserStateModel): AuthUserModel | undefined {
    return state.loggedInUser;
  }

  @Action(RemoveUserFromStorage)
  removeUserFromStorage(ctx: StateContext<UserStateModel>) {
    ctx.setState({Users: [], loggedInUser: undefined})
  }

  @Action(ListenForLogin)
  listenForLogin(ctx: StateContext<UserStateModel>) {
    return this.loginService.listenForLogin().pipe(
      tap(userModel => {
        const state = ctx.getState();
        const newState: UserStateModel = {
          ...state,
          loggedInUser: userModel
        };
        ctx.setState(newState);
      })
    );
  }

  @Action(UserLoggedIn)
  userLoggedIn(ctx: StateContext<UserStateModel>, userLoggedInAction: UserLoggedIn) {
    return this.loginService.login({
      id: userLoggedInAction.user.id,
      username: userLoggedInAction.user.username,
      password: userLoggedInAction.user.password})
    }

  @Action(LoadUserFromStorage)
  loadUserFromStorage(ctx: StateContext<UserStateModel>): void {
    const state = ctx.getState();
    const user = state.loggedInUser;
    if (user) {
      this.loginService.login({
        id: user.id,
        username: user.username,
        password: user.password
      });
    }
  }
}
