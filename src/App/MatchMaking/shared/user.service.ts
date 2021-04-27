import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserDto} from './user.dto';
import {UserModel} from './user.model';
import {SocketApp} from '../../app.module';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private socketApp: SocketApp) { }
  sendUser(user: UserDto): void {
    this.socketApp.emit('user', user)
  }
  updateUser(id: string, user: UserModel): void {
    this.socketApp.emit('updateUser', user)
  }
  listenForCreateSuccess(): Observable<UserDto> {
    return this.socketApp.fromEvent<UserDto>('user-created-success')
  }
  listenForCreateError(): Observable<string> {
    return this.socketApp.fromEvent<string>('user-created-error')
  }
  listenForUsers(): Observable<UserModel[]>{
    return this.socketApp.fromEvent<UserModel[]>("users")
  }
  listenForUserList(): void{
    this.socketApp.emit('welcomeUser')
  }
  joinUser(dto: UserModel): void{
    this.socketApp.emit('joinUser', dto);
  }

}
