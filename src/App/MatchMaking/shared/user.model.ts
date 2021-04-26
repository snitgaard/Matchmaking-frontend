import {MatchModel} from './match.model';
import {MessageModel} from './message.model';

export interface UserModel {
  id: string;
  username: string;
  password: string;
  rating: number;
  inGame: boolean;
  inQueue: boolean;
  messages?: MessageModel[];
  matches?: MatchModel[];
  typing?: boolean;
}
