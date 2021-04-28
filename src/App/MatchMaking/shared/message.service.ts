import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SocketApp} from '../../app.module';
import {MessageDto} from './message.dto';
import {MessageModel} from './message.model';
import {map} from 'rxjs/operators';



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
  getAllMessages(): void {
    this.socketApp.emit('getAllMessages');
  }
  listenForMessageList(): Observable<MessageModel[]>{
    return this.socketApp.fromEvent<MessageDto[]>('allMessages')
      .pipe(
        map(messages => {
          console.log("messages",messages)
         return JSON.parse(JSON.stringify(messages));
        })
      )
  }
  joinMessage(dto: MessageModel): void{
    this.socketApp.emit('joinMessage', dto);
  }


}
