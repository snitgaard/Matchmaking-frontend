import {MatchModel} from './match.model';

export interface MatchDto {
  matches: MatchModel[];
  match: MatchModel;
}
