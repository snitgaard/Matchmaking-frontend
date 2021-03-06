import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';

import {Subscription} from 'rxjs';

import {CreateUser, ListenForUsers, NewUser, StopListeningForUsers, UpdateUser, UpdateUsers} from './user.actions';
import {UserModel} from '../../shared/user.model';
import {UserService} from '../../shared/user.service';
import {tap} from 'rxjs/operators';
import {LoginState} from '../../login/state/login.state';
import {LoggedInUserUpdate} from '../../login/state/login.actions';


export interface UserStateModel {
  Users: UserModel[];
  sortedUsers: UserModel[];
  loggedInUser: UserModel | undefined;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    Users: [],
    sortedUsers: [],
    loggedInUser: undefined,
  }
})
@Injectable()
export class UserState {
  private usersUnsub: Subscription | undefined;
  private unsubscribeNewUser: Subscription | undefined;

  constructor(private userService: UserService, private store: Store) {
  }

  @Selector()
  static users(state: UserStateModel): UserModel[] {
    return state.Users;
  }

  @Selector()
  static sortUsersByRating(state: UserStateModel): UserModel[] {
    return state.sortedUsers;
  }

  @Selector()
  static userIds(state: UserStateModel): string[] {
    return state.Users.map(c => c.id);
  }

  @Selector()
  static relevantUser(state: UserStateModel): UserModel | undefined {
    return state.loggedInUser;
  }

  @Action(ListenForUsers)
  getUsers(ctx: StateContext<UserStateModel>) {
    this.usersUnsub = this.userService.listenForUsers().subscribe(users => {
      ctx.dispatch(new UpdateUsers(users));
      const loggedInId = this.store.selectSnapshot(LoginState.loggedInUser).id;
      users.forEach(user => {
        if (user.id === loggedInId) {
          ctx.dispatch(new LoggedInUserUpdate(user));
        }
      });
    });
    this.userService.getAllUsers();
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<UserStateModel>, updateUser: UpdateUser) {
    this.userService.updateUser(updateUser.updatedUser.id, updateUser.updatedUser);
  }


  @Action(UpdateUsers)
  updateUsers(ctx: StateContext<UserStateModel>, uc: UpdateUsers): void {
    const state = ctx.getState();
    const newState: UserStateModel = {
      ...state,
      Users: uc.users,
      sortedUsers: uc.users.sort((u1, u2) => u2.rating - u1.rating)
    };
    ctx.setState(newState);
  }


  @Action(StopListeningForUsers)
  stopListeningForClients(ctx: StateContext<UserStateModel>): void {
    if (this.usersUnsub) {
      this.usersUnsub.unsubscribe();
    }
  }

  @Action(CreateUser)
  createUser({getState, patchState}: StateContext<UserStateModel>, {payload}: CreateUser) {
    return this.userService.createUser(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        Users: [...state.Users, result]
      });
    }));
  }

  @Action(NewUser)
  newUser(ctx: StateContext<UserStateModel>) {
    this.unsubscribeNewUser = this.userService.listenForNewUser().subscribe(user => {
      const state = ctx.getState();
      const newUsers = [...state.Users];
      newUsers.push(user);
      ctx.setState({
        ...state,
        Users: newUsers
      });
    });
  }
}
