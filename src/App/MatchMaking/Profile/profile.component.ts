import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from './state/user.state';
import {Observable} from 'rxjs';
import {UserModel} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {ListenForUsers} from './state/user.actions';


@Component({
  selector: 'app-chat',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy
{
  @Select(UserState.users) users$: Observable<UserModel[]> | undefined;
  constructor(private userService: UserService, private store: Store) {
  }
  ngOnInit(): void {
    this.store.dispatch(new ListenForUsers());
    this.users$ = this.userService.listenForUsers();
  }

  ngOnDestroy(): void {
  }
}
