import {ChatModel} from '../../shared/chat.model';
import {ChatDto} from '../../shared/chat.dto';


export class ListenForMessages {
  static readonly type = '[Chat] Listen For Messages';
}

export class StopListeningForMessages {
  static readonly type = '[Chat] Stop Listening For Messages';
}


export class UpdateMessages {
  static readonly type = '[Chat] Update Messages';

  constructor(public messages: ChatModel[]) {
  }
}

export class SendMessage {
  static readonly type = '[Chat] Send Message';

  constructor(public payload: ChatDto) {
  }
}

export class NewMessage {
  static readonly type = '[Chat] New Message';
}
