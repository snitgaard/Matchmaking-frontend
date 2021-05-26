import {UserModel} from '../../shared/user.model';

export class UserLoggedIn {
  static readonly type = '[User] New User Logged In';

  constructor(public user: UserModel) {
  }
}

export class LoadUserFromStorage {
  static readonly type = '[User] Load User From Storage';
}

export class ListenForLogin {
  static readonly type = '[User] Listen for login';
}

export class RemoveUserFromStorage {
  static readonly type = '[User] Remove User From Storage';
}

export class LoggedInUserUpdate {
  static readonly type = '[User] Updating logged in user';

  constructor(public user: UserModel) {
  }
}
