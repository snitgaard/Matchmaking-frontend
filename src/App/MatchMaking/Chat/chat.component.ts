import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserModel} from '../shared/user.model';
import {ChatModel} from '../shared/chat.model';
import {Observable, Subject} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../Profile/state/user.state';
import {ChatState} from './state/chat.state';
import {CreateUser, ListenForUsers} from '../Profile/state/user.actions';
import {ListenForMessages, SendMessage, StopListeningForMessages} from './state/chat.actions';
import {ChatDto} from '../shared/chat.dto';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy
{
  @Select(ChatState.messages) messages$: Observable<ChatModel[]> | undefined;
  @Select(UserState.users) users$: Observable<UserModel[]> | undefined;

  messageFc = new FormControl('');
  nameFC = new FormControl('');
  allMessages$: Observable<ChatModel[]>;
  userTyping: UserModel[] = [];
  unsubscribe$ = new Subject();
  userModel: UserModel | undefined;
  error$: Observable<string> | undefined;
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ListenForMessages()).pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.store.dispatch(new ListenForUsers());
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    //this.store.dispatch(new StopListeningForMessages());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendMessage(): void {
    const dtoTest: ChatDto = {
      message: this.messageFc.value,
      userId: '123e4567-e89b-12d3-a456-426614174200',
    };
    console.log(dtoTest)
    this.store.dispatch(new SendMessage(dtoTest));
    this.messageFc.patchValue('');
  }
}
