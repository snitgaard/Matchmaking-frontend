import {MatchModel} from './match.model';
import {ChatModel} from './chat.model';
import {MatchResultsModel} from './match-results.model';

export interface UserModel {
  id: string;
  username: string;
  password: string;
  rating: number;
  inGame: boolean;
  inQueue: boolean;
  messages?: ChatModel[];
  matchResults?: MatchResultsModel[];
  typing?: boolean;
  isActive?: boolean;
  lobbyLeader?: boolean;
}
