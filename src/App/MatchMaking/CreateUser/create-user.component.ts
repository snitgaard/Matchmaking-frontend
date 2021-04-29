import { Component, OnInit } from '@angular/core';
import {UserModel} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {FormBuilder} from '@angular/forms';

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

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createUser(): void {
    const userDto: UserModel = this.userFb.value;
    this.userService.createUser(userDto);
  }

}
