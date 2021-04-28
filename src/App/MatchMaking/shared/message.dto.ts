
import {UserModel} from './user.model';

export interface MessageDto {
  message: string;
  user: UserModel;
  date: number;

}
