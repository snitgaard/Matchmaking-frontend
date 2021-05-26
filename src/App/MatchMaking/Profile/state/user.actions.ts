import {UserModel} from '../../shared/user.model';


export class ListenForUsers {
  static readonly type = '[User] Listen For Users';
}

export class StopListeningForUsers {
  static readonly type = '[User] Stop Listening For Users';
}

export class CreateUser {
  static readonly type = '[User] Create User';

  constructor(public payload: UserModel) {
  }
}

export class NewUser {
  static readonly type = '[User] New User';
}

export class UpdateUser {
  static readonly type = '[User] Updated User';

  constructor(public updatedUser: UserModel) {
  }
}

export class UpdateUsers {
  static readonly type = '[User] Update Users';

  constructor(public users: UserModel[]) {
  }
}


