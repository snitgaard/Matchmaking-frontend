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
import {MessageState} from './state/chat.state';
import {ListenForUsers} from '../Profile/state/user.actions';
import {ListenForMessages} from './state/chat.actions';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy
{
  @Select(MessageState.messages) messages$: Observable<ChatModel[]> | undefined;

  messageFc = new FormControl('');
  nameFC = new FormControl('');
  messages: ChatModel[] = [];
  allMessages$: Observable<ChatModel[]>;
  userTyping: UserModel[] = [];
  unsubscribe$ = new Subject();
  users$: Observable<UserModel[]> | undefined;
  userModel: UserModel | undefined;
  error$: Observable<string> | undefined;
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ListenForMessages());

    /*
    this.messageFc.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500)
      )
      .subscribe((value) => this.chatService.sendTyping(value.length > 0));

    //help
    this.chatService.listenForMessages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(message => {
        this.messages.push(message)
      });


    this.chatService.listenForUserTyping()
      .pipe(takeUntil(this.unsubscribe$)
      )
      .subscribe((userModel) => {
        if(userModel.typing && !this.userTyping.find((c) => c.id === userModel.id)) {
          this.userTyping.push(userModel);
        } else {
          this.userTyping = this.userTyping.filter((c) => c.id !== userModel.id);
        }
      })

     this.userService.listenForWelcome()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(messages => {
        this.messages = messages;
        this.userModel = this.userService.userModel = messages;
      })

    if(this.userService.userModel) {
      this.userService.createUser(this.userService.userModel);
    }

    this.error$ = this.userService.listenForError().pipe(takeUntil(this.unsubscribe$));

    this.allMessages$ = this.chatService.listenForMessages().pipe(
      takeUntil(this.unsubscribe$));

    this.chatService
      .getAllMessages();
     */

  }

  sendMessage(): void {
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
