import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SocketApp} from '../../app.module';
import {MessageDto} from './message.dto';
import {MessageModel} from './message.model';



@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private socketApp: SocketApp) { }
  sendMessage(message: MessageDto): void {
    this.socketApp.emit('message', message)
  }
  updateMessage(id: string, message: MessageModel): void {
    this.socketApp.emit('updateMessage', message)
  }
  listenForCreateSuccess(): Observable<MessageDto> {
    return this.socketApp.fromEvent<MessageDto>('message-created-success')
  }
  listenForCreateError(): Observable<string> {
    return this.socketApp.fromEvent<string>('message-created-error')
  }
  listenForMessages(): Observable<MessageModel[]>{
    return this.socketApp.fromEvent<MessageModel[]>("messages")
  }
  askForAllMessages(): void{
    this.socketApp.emit('welcomeMessages')
  }
  joinMessage(dto: MessageModel): void{
    this.socketApp.emit('joinMessage', dto);
  }

}
