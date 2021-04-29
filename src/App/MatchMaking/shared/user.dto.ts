import {UserModel} from './user.model';
import {ChatModel} from './chat.model';

export interface UserDto {
  users: UserModel[];
  user: UserModel;
}
