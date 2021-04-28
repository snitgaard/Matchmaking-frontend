import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserModel} from '../shared/user.model';
import {MessageModel} from '../shared/message.model';
import {Observable, Subject} from 'rxjs';
import {MessageService} from '../shared/message.service';
import {debounceTime, takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy
{
  messageFc = new FormControl('');
  nameFC = new FormControl('');
  messages: MessageModel[] = [];
  userTyping: UserModel[] = [];
  unsubscribe$ = new Subject();
  users$: Observable<UserModel[]> | undefined;
  userModel: UserModel | undefined;
  error$: Observable<string> | undefined;
  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageFc.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500)
      )
      .subscribe((value) => this.messageService.(value.length > 0));

    this.clients$ = this.chatService.listenForClients();

    this.chatService.listenForMessages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(message => {
        this.messages.push(message)
      });


    this.chatService.listenForClientTyping()
      .pipe(takeUntil(this.unsubscribe$)
      )
      .subscribe((chatClient) => {
        if(chatClient.typing && !this.clientsTyping.find((c) => c.id === chatClient.id)) {
          this.clientsTyping.push(chatClient);
        } else {
          this.clientsTyping = this.clientsTyping.filter((c) => c.id !== chatClient.id);
        }
      })

    this.chatService.listenForWelcome()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(welcome => {
        this.messages = welcome.messages;
        this.chatClient = this.chatService.chatClient = welcome.client;
      })

    if(this.chatService.chatClient) {
      this.chatService.sendName(this.chatService.chatClient.name);
    }

    this.error$ = this.chatService.listenForError().pipe(takeUntil(this.unsubscribe$));
  }

  sendMessage(): void {
    console.log(this.messageFc.value);
    this.chatService.sendMessage(this.messageFc.value);
    this.messageFc.patchValue('');
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendName(): void {
    if(this.nameFC.value)
    {
      this.chatService.sendName(this.nameFC.value);
    }
  }
}
