import {MatchModel} from '../../shared/match.model';
import {UserModel} from '../../shared/user.model';
import {MatchResultsModel} from '../../shared/match-results.model';



export class CreateMatch {
  static readonly type = '[Match] Create Match';

  constructor(public payload: MatchModel) {
  }
}

export class CreateMatchResult {
  static readonly type = '[MatchResult] Create MatchResult';

  constructor(public resultPayload: MatchResultsModel) {
  }
}

export class NewMatchResult {
  static readonly type = '[MatchResult] New MatchResult';
}

export class NewMatch {
  static readonly type = '[Match] New Match';
}

export class LoadMatchFromStorage {
  static readonly type = '[Match] Load Match From Storage';
}
export class ListenForMatches {
  static readonly type = '[Match] Listen for Matches';
}
export class RemoveMatchesFromStorage {
  static readonly type = '[Match] Remove User From Storage';
}
export class UpdateMatches {
  constructor(public matches: MatchModel[]) {}

  static readonly type = '[Match] Update Matches';
}

export class UpdateMatch {
  static readonly type = '[Match] Updated Match';
  constructor(public updatedMatch: MatchModel) {
  }
}
