import { Component, OnInit } from '@angular/core';
import {UserModel} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {FormBuilder} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {CreateUser, ListenForUsers} from '../Profile/state/user.actions';
import {UserState} from '../Profile/state/user.state';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ListenForMessages} from '../Chat/state/chat.actions';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @Select(UserState.users) users$: Observable<UserModel[]> | undefined;
  unsubscribe$ = new Subject();

  userFb = this.fb.group({
    username: [''],
    password: [''],
    rating: [''],
  });
  userCreate: UserModel | undefined;

  constructor(private userService: UserService, private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new ListenForMessages()).pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  createUser(): void {
    const userDto: UserModel = this.userFb.value;
    console.log(userDto);
    this.store.dispatch(new CreateUser(userDto));
    //this.userService.createUser(userDto);
  }

}
