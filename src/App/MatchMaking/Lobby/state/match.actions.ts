import {MatchModel} from "../../shared/match.model";
import {UserModel} from "../../shared/user.model";



export class CreateMatch {
  static readonly type = '[Match] Create Match';

  constructor(public payload: MatchModel) {
  }
}

export class NewMatch {
  static readonly type = '[Match] New Match';
}

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
