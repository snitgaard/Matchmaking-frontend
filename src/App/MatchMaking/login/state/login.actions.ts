import {UserModel} from '../../shared/user.model';

export class UserLoggedIn {
  constructor(public user: UserModel) {}

  static readonly type = '[User] New User Logged In';
}

export class LoadUserFromStorage {
  static readonly type = '[User] Load User From Storage';
}
