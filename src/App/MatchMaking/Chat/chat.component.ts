import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserModel} from '../shared/user.model';
import {ChatModel} from '../shared/chat.model';
import {Observable, Subject} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../Profile/state/user.state';
import {ChatState} from './state/chat.state';
import {CreateUser, ListenForUsers, StopListeningForUsers, UpdateUser} from '../Profile/state/user.actions';
import {ListenForMessages, NewMessage, SendMessage, StopListeningForMessages} from './state/chat.actions';
import {ChatDto} from '../shared/chat.dto';
import {takeUntil} from 'rxjs/operators';
import {LoginState} from '../login/state/login.state';
import {LoadUserFromStorage, UserLoggedIn} from '../login/state/login.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy
{
  @Select(ChatState.messages) messages$: Observable<ChatModel[]> | undefined;
  @Select(UserState.users) users$: Observable<UserModel[]> | undefined;
  @Select(LoginState.loggedInUser) loggedInUser$: Observable<UserModel> | undefined;

  messageFc = new FormControl('');
  nameFC = new FormControl('');
  allMessages$: Observable<ChatModel[]>;
  userTyping: UserModel[] = [];
  unsubscribe$ = new Subject();
  userModel: UserModel | undefined;
  userId: string;
  username: string;
  error$: Observable<string> | undefined;
  activeUsers: UserModel[] = [];
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ListenForMessages()).pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.store.dispatch(new NewMessage());
    this.getActiveUsers();
    this.store.dispatch(new ListenForUsers());
  }

  getActiveUsers(): void {
    const loggedInUser = {...this.store.selectSnapshot(LoginState.loggedInUser)};
    loggedInUser.isActive = true;
    this.store.dispatch(new UpdateUser(loggedInUser));
    this.users$.pipe(takeUntil(this.unsubscribe$)).subscribe((users) => {
      users.forEach(activeUser => {
        const index = this.activeUsers.findIndex(user => user.id === activeUser.id)
        if (activeUser.isActive === true && index === -1)
        {
          this.activeUsers.push(activeUser);
        }
      });
    });
  }

  ngOnDestroy(): void {
    const loggedInUser = {...this.store.selectSnapshot(LoginState.loggedInUser)};
    loggedInUser.isActive = false;
    this.store.dispatch(new UpdateUser(loggedInUser));
    console.log('Destroyed');
    this.store.dispatch(new StopListeningForMessages());
    this.store.dispatch(new StopListeningForUsers());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendMessage(): void {
    const loggedInUser = {...this.store.selectSnapshot(LoginState.loggedInUser)};
    const dtoTest: ChatDto = {
      message: this.messageFc.value,
      userId: loggedInUser.id
    };
    this.store.dispatch(new SendMessage(dtoTest));
    this.messageFc.patchValue('');
  }
}
