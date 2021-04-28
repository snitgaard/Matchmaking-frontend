import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {MessageState} from './state/message.state';
import {MessageModel} from '../shared/message.model';
import {ListenForMessages} from './state/message.actions';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit
{
  @Select(MessageState.messages) messages$: Observable<MessageModel[]> | undefined;

  unsubscribe$ = new Subject();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new ListenForMessages());
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
