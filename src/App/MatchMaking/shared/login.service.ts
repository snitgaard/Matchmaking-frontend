import {Injectable} from '@angular/core';
import {UserModel} from './user.model';
import {SocketApp} from '../../app.module';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthUserModel} from './auth-user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userModel: UserModel | undefined;

  constructor(private socketApp: SocketApp) { }

  login(user: AuthUserModel): void {
    this.socketApp.emit('connect-user', user);
  }

  listenForLogin(): Observable<AuthUserModel> {
    return this.socketApp.fromEvent<AuthUserModel>("iamconnected")
  }

  listenForConnect(): Observable<string> {
    return this.socketApp
      .fromEvent<string>("connect")
      .pipe(
        map(() => {
          return this.socketApp.ioSocket.id;
        }))
  };
  listenForDisconnect(): Observable<string> {
    return this.socketApp
      .fromEvent<string>("disconnect")
      .pipe(
        map(() => {
          return this.socketApp.ioSocket.id;
        }))
  };

}