import {MatchResultsModel} from './match-results.model';

export interface MatchModel {
  id: string;
  matchResults?: MatchResultsModel[];
  score?: string;
  hasEnded?: boolean;
}
