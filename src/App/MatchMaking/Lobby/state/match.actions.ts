
import {MatchModel} from '../../shared/match.model';


export class ListenForMatches {
  static readonly type = '[Match] Listen For Matches';
}

export class StopListeningForMatches {
  static readonly type = '[Match] Stop Listening For Matches';
}

export class UpdateMatches {
  constructor(public matches: MatchModel[]) {}

  static readonly type = '[Match] Update Matches';
}

export class MatchLoggedIn {
  constructor(public match: MatchModel) {}

  static readonly type = '[Match] New Match Logged In';
}

export class LoadMatchFromStorage {
  static readonly type = '[Match] Load Match From Storage';
}
