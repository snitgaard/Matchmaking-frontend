import {UserModel} from '../../shared/user.model';
import {AuthUserModel} from '../../shared/auth-user.model';

export class UserLoggedIn {
  constructor(public user: AuthUserModel) {}

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
