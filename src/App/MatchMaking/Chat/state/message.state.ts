import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';

import {Subscription} from 'rxjs';

import {
  ListenForMessages,
  LoadMessageFromStorage,
  MessageLoggedIn,
  StopListeningForMessages,
  UpdateMessages
} from './message.actions';
import {MessageModel} from '../../shared/message.model';
import {MessageService} from '../../shared/message.service';


export interface MessageStateModel {
  Messages: MessageModel[];
  RelevantMessage: MessageModel | undefined;
}

@State<MessageStateModel>({
  name: 'message',
  defaults: {
    Messages: [],
    RelevantMessage: undefined,
  }
})
@Injectable()
export class MessageState {
  private messagesUnsub: Subscription | undefined;

  constructor(private messageService: MessageService) {
  }

  @Selector()
  static messages(state: MessageStateModel): MessageModel[] {
    return state.Messages;
  }

  @Action(ListenForMessages)
  getMessages(ctx: StateContext<MessageStateModel>){
    this.messagesUnsub = this.messageService.listenForMessages().subscribe(messages => {
      ctx.dispatch(new UpdateMessages(messages));
    });
    this.messageService.askForAllMessages();
  }

  @Action(UpdateMessages)
  updateMessages(ctx: StateContext<MessageStateModel>, uc: UpdateMessages): void {
    const state = ctx.getState();
    const newState: MessageStateModel = {
      ...state,
      Messages: uc.messages
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
