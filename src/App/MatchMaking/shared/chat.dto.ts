
import {UserModel} from './user.model';

export interface ChatDto {
  message: string;
  user: UserModel;
  date: number;

}
