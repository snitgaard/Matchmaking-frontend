import {MatchModel} from './match.model';
import {UserModel} from './user.model';

export interface MatchResultsModel {
  id: string;
  result: boolean;
  match?: MatchModel;
  user: UserModel;
}
