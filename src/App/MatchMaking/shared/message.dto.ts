import {MessageModel} from './message.model';

export interface MessageDto {
  messages: MessageModel[];
  message: MessageModel;

}
