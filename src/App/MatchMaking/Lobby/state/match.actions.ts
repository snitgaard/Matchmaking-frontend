import {MatchModel} from "../../shared/match.model";
import {UserModel} from "../../shared/user.model";



export class LoadMatchFromStorage {
  static readonly type = '[Match] Load Match From Storage';
}
export class ListenForMatches {
  static readonly type = '[Match] Listen for Matches'
}
export class RemoveMatchesFromStorage {
  static readonly type = '[Match] Remove User From Storage'
}
export class UpdateMatches {
  constructor(public matches: MatchModel[]) {}

  static readonly type = '[Match] Update Matches';
}
