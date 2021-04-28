import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';

import {Subscription} from 'rxjs';

import {
  ListenForMatches, UpdateMatches

} from './match.actions';
import {MessageModel} from '../../shared/message.model';
import {MessageService} from '../../shared/message.service';
import {MatchModel} from '../../shared/match.model';
import {MatchService} from '../../shared/match.service';


export interface MatchStateModel {
  Matches: MatchModel[];
  RelevantMatch: MatchModel | undefined;
}

@State<MatchStateModel>({
  name: 'match',
  defaults: {
    Matches: [],
    RelevantMatch: undefined,
  }
})
@Injectable()
export class MatchState {
  private matchesUnsub: Subscription | undefined;

  constructor(private matchService: MatchService) {
  }

  @Selector()
  static matches(state: MatchStateModel): MatchModel[] {
    return state.Matches;
  }

  @Action(ListenForMatches)
  getMatches(ctx: StateContext<MatchStateModel>){
    this.matchesUnsub = this.matchService.listenForMatches().subscribe(matches => {
      ctx.dispatch(new UpdateMatches(matches));
    });
    this.matchService.askForAllMatches();
  }

  @Action(UpdateMatches)
  updateMatches(ctx: StateContext<MatchStateModel>, uc: UpdateMatches): void {
    const state = ctx.getState();
    const newState: MatchStateModel = {
      ...state,
      Matches: uc.matches
    };
    ctx.setState(newState);
  }

  /*
  @Selector()
  static userIds(state: UserStateModel): string[] {
    return state.Users.map(c => c.id);
  }

  @Selector()
  static relevantUser(state: UserStateModel): UserModel |undefined {
    return state.RelevantUser;
  }


  @Action(StopListeningForUsers)
  stopListeningForClients(ctx: StateContext<UserStateModel>): void {
    if (this.usersUnsub) {
      this.usersUnsub.unsubscribe();
    }
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
   */
}
