import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserModel} from '../shared/user.model';
import {ChatModel} from '../shared/chat.model';
import {Observable, Subject} from 'rxjs';
import {ChatService} from '../shared/chat.service';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {UserService} from '../shared/user.service';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../Profile/state/user.state';
import {ChatState} from './state/chat.state';
import {ListenForUsers} from '../Profile/state/user.actions';
import {ListenForMessages} from './state/chat.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy
{
  @Select(ChatState.messages) messages$: Observable<ChatModel[]> | undefined;

  messageFc = new FormControl('');
  nameFC = new FormControl('');
  messages: ChatModel[] = [];
  allMessages$: Observable<ChatModel[]>;
  userTyping: UserModel[] = [];
  unsubscribe$ = new Subject();
  userModel: UserModel | undefined;
  error$: Observable<string> | undefined;
  constructor(private store: Store) {
  }

  @Select(UserState.users) users$: Observable<UserModel[]> | undefined;

  ngOnInit(): void {
    this.store.dispatch(new ListenForMessages());
    this.store.dispatch(new ListenForUsers());

  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /*sendMessage(): void {
    console.log(this.messageFc.value);
    this.chatService.createMessage(this.messageFc.value);
    this.messageFc.patchValue('');
  }

  sendName(): void {
    if (this.nameFC.value)
    {
      this.userService.createUser(this.nameFC.value);
    }
  }*/
}
