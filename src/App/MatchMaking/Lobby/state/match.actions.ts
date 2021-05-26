import {MatchModel} from '../../shared/match.model';
import {UserModel} from '../../shared/user.model';
import {MatchResultsModel} from '../../shared/match-results.model';
export enum MatchUpdateType {
  Joined,
  New,
  Found
}

export class JoinLobby {
  static readonly type = '[Match] Join The Lobby';

  constructor(public user: UserModel) {
  }
}

export class UpdateMatchResult {
  constructor(public matchResult: MatchResultsModel) {}

  static readonly type = '[MatchResult] Update MatchResult';
}

export class ListenForNewMatchCreated {
  static readonly type = '[Match] Listen For new Match Created';

}

export class ListenForMatchFound {
  static readonly type = '[Match] Listen For Match Found';

}

export class ListenForJoinedMatch {
  static readonly type = '[Match] Listen For Match Joined';

}

export class MatchUpdated {
  static readonly type = '[Match] a match has updated';
  constructor(public match: MatchModel, public type: MatchUpdateType) {
  }

}

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


export class QueUp {
  static readonly type = '[MatchResult] Que Up';
}

export class NewMatch {
  static readonly type = '[Match] New Match';

}

export class NewMatchCreated {
  static readonly type = '[Match] New Match Created';
  constructor(public match: MatchModel) {
  }
}

export class GetUsersOnMatch {
  static readonly type = '[Match] Get Users On Match';
}

export class ListenForMatches {
  static readonly type = '[Match] Listen for Matches';
}
export class ListenForMatchResults {
  static readonly type = '[MatchResult] Listen for MatchResults';
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
