import {Injectable} from '@angular/core';
import {UserModel} from './user.model';
import {SocketApp} from '../../app.module';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userModel: UserModel | undefined;

  constructor(private socketApp: SocketApp) { }
  login(user: UserModel): Observable<UserModel> {
    return this.socketApp.emit('connect-user', user);
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
