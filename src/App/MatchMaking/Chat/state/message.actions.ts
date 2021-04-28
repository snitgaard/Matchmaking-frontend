import {MessageModel} from '../../shared/message.model';


export class ListenForMessages {
  static readonly type = '[Message] Listen For Messages';
}

export class StopListeningForMessages {
  static readonly type = '[Message] Stop Listening For Messages';
}

export class UpdateMessages {
  constructor(public messages: MessageModel[]) {}

  static readonly type = '[Message] Update Messages';
}

export class MessageLoggedIn {
  constructor(public message: MessageModel) {}

  static readonly type = '[Message] New Message Logged In';
}

export class LoadMessageFromStorage {
  static readonly type = '[Message] Load Message From Storage';
}
