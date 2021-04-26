import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserDto} from './user.dto';
import {UserModel} from './user.model';
import {SocketUser} from '../../app.module';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private socketUser: SocketUser) { }
  sendUser(user: UserDto): void {
    this.socketUser.emit('user', user)
  }
  updateUser(id: string, user: UserModel): void {
    this.socketUser.emit('updateUser', user)
  }
  listenForCreateSuccess(): Observable<UserDto> {
    return this.socketUser.fromEvent<UserDto>('user-created-success')
  }
  listenForCreateError(): Observable<string> {
    return this.socketUser.fromEvent<string>('user-created-error')
  }
  listenForUsers(): Observable<UserModel[]>{
    return this.socketUser.fromEvent<UserModel[]>("users")
  }
  listenForUserList(): void{
    this.socketUser.emit('welcomeUser')
  }
  joinUser(dto: UserModel): void{
    this.socketUser.emit('joinStock', dto);
  }

}
