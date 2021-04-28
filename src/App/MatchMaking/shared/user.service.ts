import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserDto} from './user.dto';
import {UserModel} from './user.model';
import {SocketApp} from '../../app.module';
import {MessageDto} from './message.dto';
import {MessageModel} from './message.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  userModel: UserModel | undefined;

  constructor(private socketApp: SocketApp) { }
  sendUser(user: UserModel): void {
    this.socketApp.emit('user', user);
  }
  sendUserName(username: string) {
    this.socketApp.emit("username", username);
  }
  updateUser(id: string, user: UserModel): void {
    this.socketApp.emit('updateUser', user);
  }
  listenForCreateSuccess(): Observable<UserDto> {
    return this.socketApp.fromEvent<UserDto>('user-created-success');
  }
  listenForCreateError(): Observable<string> {
    return this.socketApp.fromEvent<string>('user-created-error');
  }
  listenForUsers(): Observable<UserModel[]>{
    return this.socketApp.fromEvent<UserModel[]>('users');
  }
  askForAllUsers(): void{
    this.socketApp.emit('welcomeUser');
  }
  listenForWelcome(): Observable<MessageDto[]> {
    return this.socketApp
      .fromEvent<MessageDto[]>("welcome")
  }
  joinUser(dto: UserModel): void{
    this.socketApp.emit('joinUser', dto);
  }
  listenForError(): Observable<string> {
    return this.socketApp
      .fromEvent<string>("error");
  }
  listenForUserTyping(): Observable<UserModel> {
    return this.socketApp
      .fromEvent<UserModel>("userTyping")
  }
  sendTyping(typing: boolean): void {
    this.socketApp.emit('typing', typing);
  }
  listenForMessages(): Observable<MessageModel> {
    return this.socketApp
      .fromEvent<MessageModel>("newMessage")
  }
  sendMessage(message: MessageDto): void {
    this.socketApp.emit('message', message)
  }
}
