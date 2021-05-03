import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {LoginState} from './state/login.state';
import {Observable, Subject} from 'rxjs';
import {UserModel} from '../shared/user.model';
import {ListenForLogin, LoadUserFromStorage, RemoveUserFromStorage, UserLoggedIn} from './state/login.actions';
import {LoginService} from '../shared/login.service';
import {takeUntil} from 'rxjs/operators';
import {FormBuilder} from '@angular/forms';
import {CreateUser} from '../Profile/state/user.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Select(LoginState.loggedInUser) loggedInUser$: Observable<UserModel> | undefined;
  unsubscribe$ = new Subject();
  socketId: string | undefined;
  userFb = this.fb.group({
    username: [''],
    password: [''],
  });
  constructor(private store: Store, private loginService: LoginService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch([new LoadUserFromStorage(), new ListenForLogin()]);

    this.loginService.listenForConnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        this.socketId = id;
      });
    this.loginService.listenForDisconnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        this.socketId = id;
      });
  }

  login(): void {
    const userDto: UserModel = this.userFb.value;
    this.store.dispatch(new UserLoggedIn(userDto)).subscribe(success => {
      this.router.navigateByUrl('/Profile');
    });
  }
}
