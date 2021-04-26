import {UserModel} from '../../shared/user.model';


export class ListenForUsers {
  static readonly type = '[User] Listen For Users';
}

export class StopListeningForUsers {
  static readonly type = '[User] Stop Listening For Users';
}

export class UpdateUser {
  constructor(public user: UserModel[]) {}

  static readonly type = '[User] Update Users';
}

export class UserLoggedIn {
  constructor(public user: UserModel) {}

  static readonly type = '[User] New User Logged In';
}

export class LoadUserFromStorage {
  static readonly type = '[User] Load User From Storage';
}
