import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SocketApp} from '../../app.module';
import {ChatDto} from './chat.dto';
import {ChatModel} from './chat.model';
import {UserModel} from './user.model';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socketApp: SocketApp) { }
  createMessage(message: ChatDto) {
    this.socketApp.emit('create-message', message);
  }
  getAllMessages(): void {
    this.socketApp.emit('getAllMessages');
  }

  listenForNewMessage(): Observable<ChatModel> {
    return this.socketApp.fromEvent<ChatModel>('new-message');
  }

  listenForMessages(): Observable<ChatModel[]>{
    return this.socketApp.fromEvent<ChatModel[]>('messages');
  }
  listenForUserTyping(): Observable<UserModel> {
    return this.socketApp
      .fromEvent<UserModel>('userTyping');
  }
  sendTyping(typing: boolean): void {
    this.socketApp.emit('typing', typing);
  }
}
