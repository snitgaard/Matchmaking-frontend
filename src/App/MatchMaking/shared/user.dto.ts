import {UserModel} from './user.model';
import {MessageModel} from './message.model';

export interface UserDto {
  users: UserModel[];
  user: UserModel;
  messages: MessageModel[];

}
