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
export class ListenForMatchResults {
  static readonly type = '[MatchResult] Listen for MatchResults';
}
export class RemoveMatchesFromStorage {
  static readonly type = '[Match] Remove User From Storage';
}
export class UpdateMatches {
  constructor(public matches: MatchModel[]) {}

  static readonly type = '[Match] Update Matches';
}

export class UpdateMatchResults {
  constructor(public matchResults: MatchResultsModel[]) {}

  static readonly type = '[MatchResult] Update MatchResults';
}

export class UpdateMatch {
  static readonly type = '[Match] Updated Match';
  constructor(public updatedMatch: MatchModel) {
  }
}

export class StopListeningForMatches {
  static readonly type = '[Match] Stop Listening For Matches';
}

export class StopListeningForMatchResults {
  static readonly type = '[MatchResult] Stop Listening For MatchResults';
}
