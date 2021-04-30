import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SocketApp} from '../../app.module';
import {ChatDto} from './chat.dto';
import {ChatModel} from './chat.model';
import {map} from 'rxjs/operators';
import {UserModel} from "./user.model";



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socketApp: SocketApp) { }
  createMessage(message: ChatDto): Observable<ChatModel> {
    return this.socketApp.emit('create-message', message)
  }
  getAllMessages(): void {
    this.socketApp.emit('getAllMessages');
  }
  listenForMessages(): Observable<ChatModel[]>{
    return this.socketApp.fromEvent<ChatModel[]>('messages');
  }
  listenForUserTyping(): Observable<UserModel> {
    return this.socketApp
      .fromEvent<UserModel>("userTyping")
  }
  sendTyping(typing: boolean): void {
    this.socketApp.emit('typing', typing);
  }
}
