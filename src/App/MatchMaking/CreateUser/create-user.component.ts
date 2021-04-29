import { Component, OnInit } from '@angular/core';
import {UserModel} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngxs/store';
import {MessageState} from '../Chat/state/chat.state';
import {CreateUser, ListenForUsers} from '../Profile/state/user.actions';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userFb = this.fb.group({
    username: [''],
    password: [''],
    rating: [],
  });
  userCreate: UserModel | undefined;

  constructor(private userService: UserService, private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
  }

  createUser(): void {
    const userDto: UserModel = this.userFb.value;
    this.store.dispatch(new CreateUser(userDto));
    //this.userService.createUser(userDto);
  }

}
