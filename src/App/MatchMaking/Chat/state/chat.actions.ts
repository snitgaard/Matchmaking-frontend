import {ChatModel} from "../../shared/chat.model";


export class ListenForMessages {
  static readonly type = '[Chat] Listen For Messages';
}

export class StopListeningForMessages {
  static readonly type = '[Chat] Stop Listening For Messages';
}

export class UpdateMessages {
  constructor(public users: ChatModel[]) {}

  static readonly type = '[Chat] Update Messages';
}
/*
export class UserLoggedIn {
  constructor(public user: ChatModel) {}

  static readonly type = '[User] New User Logged In';
}
*/
export class LoadMessageFromStorage {
  static readonly type = '[Chat] Load Message From Storage';
}
