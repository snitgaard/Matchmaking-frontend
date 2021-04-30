import {ChatModel} from "../../shared/chat.model";
import {UserModel} from '../../shared/user.model';
import {ChatDto} from '../../shared/chat.dto';


export class ListenForMessages {
  static readonly type = '[Chat] Listen For Messages';
}

export class StopListeningForMessages {
  static readonly type = '[Chat] Stop Listening For Messages';
}

export class UpdateMessages {
  constructor(public messages: ChatModel[]) {}

  static readonly type = '[Chat] Update Messages';
}

export class SendMessage {
  static readonly type = '[Chat] Send Message';

  constructor(public payload: ChatDto) {

  }
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
