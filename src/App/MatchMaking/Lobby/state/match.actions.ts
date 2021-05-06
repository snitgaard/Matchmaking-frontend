import {MatchModel} from "../../shared/match.model";

export class ListenForMatches {
  constructor(public match: MatchModel) {}

  static readonly type = '[Match] New Match Logged In';
}

export class LoadMatchFromStorage {
  static readonly type = '[Match] Load Match From Storage';
}
export class ListenForLogin {
  static readonly type = '[Match] Listen for login'
}
export class RemoveMatchesFromStorage {
  static readonly type = '[Match] Remove User From Storage'
}
