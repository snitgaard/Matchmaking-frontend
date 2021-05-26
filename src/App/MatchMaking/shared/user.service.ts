import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UserModel} from './user.model';
import {SocketApp} from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userModel: UserModel | undefined;

  constructor(private socketApp: SocketApp) { }
  createUser(user: UserModel): Observable<UserModel> {
    return this.socketApp.emit('create-user', user);
  }
  listenForUsers(): Observable<UserModel[]>{
    return this.socketApp.fromEvent<UserModel[]>('users');
  }
  listenForNewUser(): Observable<UserModel> {
    return this.socketApp.fromEvent<UserModel>('new-user');
  }
  getAllUsers(): void{
    this.socketApp.emit('getAllUsers');
  }
  updateUser(id: string, updateUser: UserModel): void  {
    this.socketApp.emit('updateUser', updateUser);
  }
}
