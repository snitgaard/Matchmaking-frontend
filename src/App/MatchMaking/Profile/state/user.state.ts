import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';

import {Subscription} from 'rxjs';

import {ListenForUsers, LoadUserFromStorage, UserLoggedIn, StopListeningForUsers, UpdateUser} from './user.actions';
import {UserModel} from '../../shared/user.model';
import {UserService} from '../../shared/user.service';


export interface UserStateModel {
  Users: UserModel[];
  RelevantUser: UserModel | undefined;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    Users: [],
    RelevantUser: undefined,
  }
})
@Injectable()
export class UserState {
  private usersUnsub: Subscription | undefined;

  constructor(private userService: UserService) {
  }

  @Selector()
  static relevantUser(state: UserStateModel): UserModel |undefined {
    return state.RelevantUser;
  }

  @Selector()
  static users(state: UserStateModel): UserModel[] {
    return state.Users;
  }

  @Selector()
  static userIds(state: UserStateModel): string[] {
    return state.Users.map(c => c.id);
  }



  @Action(ListenForUsers)
  getUsers(ctx: StateContext<UserStateModel>): void {
    this.usersUnsub = this.userService.listenForUsers()
      .subscribe(users => {
        ctx.dispatch(new UpdateUser(users));
      });
  }

  @Action(StopListeningForUsers)
  stopListeningForClients(ctx: StateContext<UserStateModel>): void {
    if (this.usersUnsub) {
      this.usersUnsub.unsubscribe();
    }
  }

  @Action(UpdateUser)
  updateClients(ctx: StateContext<UserStateModel>, uc: UpdateUser): void {
    const state = ctx.getState();
    const newState: UserStateModel = {
      ...state,
      Users: uc.user
    };
    ctx.setState(newState);
  }

  @Action(UserLoggedIn)
  userLoggedIn(ctx: StateContext<UserStateModel>, userLoggedInAction: UserLoggedIn): void {
    const state = ctx.getState();
    const newState: UserStateModel = {
      ...state,
      RelevantUser: userLoggedInAction.user
    };
    ctx.setState(newState);
  }

  @Action(LoadUserFromStorage)
  stockFromStorage(ctx: StateContext<UserStateModel>): void {
    const state = ctx.getState();
    const user = state.RelevantUser;
    if (user) {
      this.userService.joinUser({
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
