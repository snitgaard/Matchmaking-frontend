import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';

import {Subscription} from 'rxjs';
import {UserModel} from '../../shared/user.model';
import {UserService} from '../../shared/user.service';
import {LoginService} from '../../shared/login.service';
import {
  ListenForLogin,
  LoadUserFromStorage,
  LoggedInUserUpdate,
  RemoveUserFromStorage,
  UserLoggedIn
} from './login.actions';
import {AuthUserModel} from '../../shared/auth-user.model';
import {tap} from 'rxjs/operators';
import {patch, removeItem} from '@ngxs/store/operators';
import {log} from 'util';


export interface UserStateModel {
  Users: UserModel[];
  loggedInUser: UserModel | undefined;
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
  static loggedInUser(state: UserStateModel): UserModel | undefined {
    console.log('user', state.loggedInUser)
    return state.loggedInUser;
  }

  @Action(RemoveUserFromStorage)
  removeUserFromStorage(ctx: StateContext<UserStateModel>) {
    ctx.setState({Users: [], loggedInUser: undefined});
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

  @Action(LoggedInUserUpdate)
  loggedInUserUpdate(ctx: StateContext<UserStateModel>, loggedInUserUpdate: LoggedInUserUpdate) {
    const user = {...ctx.getState().loggedInUser};
    user.inQueue = loggedInUserUpdate.user.inQueue;
    user.isActive = loggedInUserUpdate.user.isActive;
    user.lobbyLeader = loggedInUserUpdate.user.lobbyLeader;
    ctx.setState({
      ...ctx.getState(),
      loggedInUser: user
    })
  }

  @Action(UserLoggedIn)
  userLoggedIn(ctx: StateContext<UserStateModel>, userLoggedInAction: UserLoggedIn) {
    return this.loginService.login({
      id: userLoggedInAction.user.id,
      username: userLoggedInAction.user.username,
      password: userLoggedInAction.user.password,
      rating: userLoggedInAction.user.rating,
      inGame: userLoggedInAction.user.inGame,
      inQueue: userLoggedInAction.user.inQueue,
      isActive: userLoggedInAction.user.isActive,
    });
    }

  @Action(LoadUserFromStorage)
  loadUserFromStorage(ctx: StateContext<UserStateModel>): void {
    const state = ctx.getState();
    const user = state.loggedInUser;
    if (user) {
      this.loginService.login({
        id: user.id,
        username: user.username,
        password: user.password,
        rating: user.rating,
        inGame: user.inGame,
        inQueue: user.inQueue,
        isActive: user.isActive
      });
    }
  }
}
