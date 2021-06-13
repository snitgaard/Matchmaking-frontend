import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';

import {Subscription} from 'rxjs';

import {ListenForMessages, NewMessage, SendMessage, StopListeningForMessages, UpdateMessages} from './chat.actions';

import {ChatModel} from '../../shared/chat.model';
import {ChatService} from '../../shared/chat.service';

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
  private unsubscribeNewMessage: Subscription | undefined;

  constructor(private chatService: ChatService) {
  }

  @Selector()
  static messages(state: ChatStateModel): ChatModel[] {
    return state.Messages;
  }

  @Action(ListenForMessages)
  getMessages(ctx: StateContext<ChatStateModel>) {
    this.messagesUnsub = this.chatService.listenForMessages().subscribe(messages => {
      ctx.dispatch(new UpdateMessages(messages));
    });
    this.chatService.getAllMessages();
  }

  @Action(NewMessage)
  newMessage(ctx: StateContext<ChatStateModel>) {
    this.unsubscribeNewMessage = this.chatService.listenForNewMessage().subscribe(message => {
      const state = ctx.getState();
      const newMessages = [...state.Messages];
      newMessages.push(message);
      ctx.setState({
        ...state,
        Messages: newMessages
      });
    });
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
    if (this.unsubscribeNewMessage) {
      this.unsubscribeNewMessage.unsubscribe();
    }
  }
}
