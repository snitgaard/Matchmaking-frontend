import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';

import {Subscription} from 'rxjs';

import {
  ListenForMessages, SendMessage, StopListeningForMessages,
  UpdateMessages
} from './chat.actions';

import {ChatModel} from "../../shared/chat.model";
import {ChatService} from "../../shared/chat.service";
import {CreateUser, StopListeningForUsers} from '../../Profile/state/user.actions';
import {tap} from 'rxjs/operators';
import {UserStateModel} from '../../Profile/state/user.state';


export interface ChatStateModel {
  Messages: ChatModel[];
  RelevantMessage: ChatModel | undefined;
}

@State<ChatStateModel>({
  name: 'message',
  defaults: {
    Messages: [],
    RelevantMessage: undefined,
  }
})
@Injectable()
export class ChatState {
  private messagesUnsub: Subscription | undefined;

  constructor(private chatService: ChatService) {
  }

  @Selector()
  static messages(state: ChatStateModel): ChatModel[] {
    return state.Messages;
  }

  @Action(ListenForMessages)
  getMessages(ctx: StateContext<ChatStateModel>){
    this.messagesUnsub = this.chatService.listenForMessages().subscribe(messages => {
      ctx.dispatch(new UpdateMessages(messages));
    });
    this.chatService.getAllMessages();
  }

  @Action(SendMessage)
  sendMessage(ctx: StateContext<ChatStateModel>, sendMessage: SendMessage) {
    return this.chatService.createMessage({
      message: sendMessage.payload.message,
      userId: sendMessage.payload.userId
    });
  }

  @Action(UpdateMessages)
  updateMessages(ctx: StateContext<ChatStateModel>, um: UpdateMessages): void {
    const state = ctx.getState();
    const newState: ChatStateModel = {
      ...state,
      Messages: um.messages
    };
    ctx.setState(newState);
  }
  @Action(StopListeningForMessages)
  stopListeningForMessages(ctx: StateContext<ChatStateModel>): void {
    if (this.messagesUnsub) {
      this.messagesUnsub.unsubscribe();
    }
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
