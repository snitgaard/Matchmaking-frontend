import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';

import {Subscription} from 'rxjs';
import {UserModel} from '../../shared/user.model';
import {UserService} from '../../shared/user.service';
import {tap} from 'rxjs/operators';
import {LoginService} from '../../shared/login.service';
import {LoadUserFromStorage, UserLoggedIn} from './login.actions';


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
  static relevantUser(state: UserStateModel): UserModel |undefined {
    return state.loggedInUser;
  }
  @Selector()
  static loggedInUser(state: UserStateModel): UserModel | undefined {
    return state.loggedInUser;
  }

  @Action(UserLoggedIn)
  userLoggedIn(ctx: StateContext<UserStateModel>, userLoggedInAction: UserLoggedIn): void {
    const state = ctx.getState();
    const newState: UserStateModel = {
      ...state,
      loggedInUser: userLoggedInAction.user
    };
    console.log("Hello1")
    ctx.setState(newState);
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
        messages: user.messages,
        matches: user.matches,
        typing: user.typing
      });
    }
  }
}
