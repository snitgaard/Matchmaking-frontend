import {MatchModel} from '../../shared/match.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {
  CreateMatch,
  CreateMatchResult,
  ListenForMatches, ListenForMatchResults,
  NewMatch,
  NewMatchResult, StopListeningForMatches, UpdateMatch,
  UpdateMatches, UpdateMatchResults
} from './match.actions';
import {MatchService} from '../../shared/match.service';
import {CreateUser, StopListeningForUsers, UpdateUser} from '../../Profile/state/user.actions';
import {tap} from 'rxjs/operators';
import {UserStateModel} from '../../Profile/state/user.state';
import {NewMessage, SendMessage} from '../../Chat/state/chat.actions';
import {ChatStateModel} from '../../Chat/state/chat.state';
import {MatchResultsModel} from '../../shared/match-results.model';



export interface MatchStateModel {
  matches: MatchModel[];
  activeMatch: MatchModel | undefined;

}

export interface MatchResultStateModel {
  matchResults: MatchResultsModel[];
  relevantResult: MatchResultsModel | undefined;
}

@State<MatchStateModel>({
  name: 'match',
  defaults: {
    matches: [],
    activeMatch: undefined,

  }
})

@Injectable()
export class MatchState {
  private matchesUnsub: Subscription | undefined;
  private unsubscribeNewMatch: Subscription | undefined;
  private matchResultsUnsub: Subscription | undefined;

  constructor(private matchService: MatchService) {
  }

  @Selector()
  static matches(state: MatchStateModel): MatchModel[] {
    return state.matches;
  }

  @Selector()
  static matchIds(state: MatchStateModel): string[] {
    return state.matches.map(c => c.id);
  }
  @Selector()
  static activeMatch(state: MatchStateModel): MatchModel {
    return state.activeMatch;
  }

  @Selector()
  static matchResults(state: MatchResultStateModel): MatchResultsModel[] {
    return state.matchResults;
  }

  @Action(ListenForMatches)
  getMatches(ctx: StateContext<MatchStateModel>){
    if (this.matchesUnsub)
    {
      this.matchesUnsub.unsubscribe();
    }
    this.matchesUnsub = this.matchService.listenForMatches().subscribe(matches => {
      ctx.dispatch(new UpdateMatches(matches));
    });
    this.matchService.getAllMatches();
  }

  @Action(ListenForMatchResults)
  getMatchResults(ctx: StateContext<MatchResultStateModel>) {
    if (this.matchResultsUnsub)
    {
      this.matchResultsUnsub.unsubscribe();
    }
    this.matchResultsUnsub = this.matchService.listenForMatchResults().subscribe(matchResults => {
      ctx.dispatch(new UpdateMatchResults(matchResults));
    });
    this.matchService.getAllMatchResults();
  }

  @Action(UpdateMatches)
  updateMatches(ctx: StateContext<MatchStateModel>, uc: UpdateMatches): void {
    const state = ctx.getState();
    const newState: MatchStateModel = {
      ...state,
      matches: uc.matches,
    };
    ctx.setState(newState);
  }

  @Action(UpdateMatchResults)
  updateMatchResults(ctx: StateContext<MatchResultStateModel>, um: UpdateMatchResults): void {
    const state = ctx.getState();
    const newState: MatchResultStateModel = {
      ...state,
      matchResults: um.matchResults,
    };
    ctx.setState(newState);
  }

  @Action(UpdateMatch)
  updateMatch(ctx: StateContext<MatchStateModel>, updateMatch: UpdateMatch) {
    this.matchService.updateMatch(updateMatch.updatedMatch.id, updateMatch.updatedMatch);
  }

  @Action(NewMatch)
  newMatch(ctx: StateContext<MatchStateModel>) {
    console.log('init');
    this.unsubscribeNewMatch = this.matchService.listenForNewMatch().subscribe(match => {
      const state = ctx.getState();
      const newActiveMatch = {...ctx.getState().activeMatch};
      const newMatches = [...state.matches];
      newMatches.push(match);
      ctx.setState({
        ...state,
        matches: newMatches,
        activeMatch: newActiveMatch
      });
    });
  }

  @Action(StopListeningForMatches)
  stopListeningForClients(ctx: StateContext<MatchStateModel>): void {
    if (this.matchesUnsub) {
      this.matchesUnsub.unsubscribe();
    }
  }

  @Action(CreateMatch)
  createMatch(ctx: StateContext<MatchStateModel>, createMatch: CreateMatch) {
    return this.matchService.createMatch({
      id: createMatch.payload.id,
      matchResults: createMatch.payload.matchResults,
      score: createMatch.payload.score
    });
  }

  @Action(CreateMatchResult)
  createMatchResult(ctx: StateContext<MatchResultStateModel>, createMatchResult: CreateMatchResult) {
    return this.matchService.createMatchResult({
      id: createMatchResult.resultPayload.id,
      result: createMatchResult.resultPayload.result,
      match: createMatchResult.resultPayload.match,
      user: createMatchResult.resultPayload.user
    });
  }
}
