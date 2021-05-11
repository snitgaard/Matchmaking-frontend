import {UserModel} from './user.model';

export interface MatchModel {
  id: string;
  winner?: UserModel;
  loser?: UserModel;
  score?: string;
}
