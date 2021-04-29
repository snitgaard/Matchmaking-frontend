import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserDto} from './user.dto';
import {UserModel} from './user.model';
import {SocketApp} from '../../app.module';
import {ChatDto} from './chat.dto';
import {ChatModel} from './chat.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  userModel: UserModel | undefined;

  constructor(private socketApp: SocketApp) { }
  createUser(user: UserModel): void {
    this.socketApp.emit('create-user', user);
  }
  listenForUsers(): Observable<UserModel[]>{
    return this.socketApp.fromEvent<UserModel[]>('users');
  }
  getAllUsers(): void{
    this.socketApp.emit('getAllUsers');
  }
  listenForError(): Observable<string> {
    return this.socketApp
      .fromEvent<string>("error");
  }

}
