import {UserModel} from '../../shared/user.model';

export class UserLoggedIn {
  constructor(public user: UserModel) {}

  static readonly type = '[User] New User Logged In';
}

export class LoadUserFromStorage {
  static readonly type = '[User] Load User From Storage';
}
export class ListenForLogin {
  static readonly type = '[User] Listen for login'
}
export class RemoveUserFromStorage {
  static readonly type = '[User] Remove User From Storage'
}

export class LoggedInUserUpdate {
  constructor(public user: UserModel){}
  static readonly type = '[User] Updating logged in user'
}
