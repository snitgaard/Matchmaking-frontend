import {MatchModel} from './match.model';
import {ChatModel} from './chat.model';

export interface UserModel {
  id: string;
  username: string;
  password: string;
  rating: number;
  inGame?: boolean;
  inQueue?: boolean;
  matches?: MatchModel[];
  typing?: boolean;
}
