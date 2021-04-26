import {UserModel} from './user.model';

export interface UserDto {
  users: UserModel[];
  user: UserModel;

}
