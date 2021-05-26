import {MatchModel} from '../../shared/match.model';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {
  CreateMatch,
  CreateMatchResult,
  GetUsersOnMatch,
  JoinLobby,
  ListenForJoinedMatch,
  ListenForMatches,
  ListenForMatchFound,
  ListenForMatchResults,
  ListenForNewMatchCreated,
  MatchUpdated,
  MatchUpdateType,
  NewMatch,
  NewMatchCreated,
  NewMatchResult,
  QueUp,
  StopListeningForMatches,
  UpdateMatch,
  UpdateMatches,
  UpdateMatchResult,
  UpdateMatchResults
} from './match.actions';
import {MatchService} from '../../shared/match.service';
import {MatchResultsModel} from '../../shared/match-results.model';
import {Router} from '@angular/router';
import {LoginState} from '../../login/state/login.state';
import {tap} from 'rxjs/operators';
import {LoggedInUserUpdate} from '../../login/state/login.actions';
import {UserModel} from '../../shared/user.model';
import {UpdateUser} from '../../Profile/state/user.actions';
import {UserStateModel} from '../../Profile/state/user.state';


export interface MatchStateModel {
  /// This is new
  currentMatch: MatchModel;
  // End new stuff
  matches: MatchModel[];
  activeMatch: MatchModel | undefined;
  relevantResults: MatchResultsModel[];
  matchResults: MatchResultsModel[];
  relevantResult: MatchResultsModel | undefined;
  waitingForMatch: boolean;
}

@State<MatchStateModel>({
  name: 'match',
  defaults: {
    /// This is new
    currentMatch: undefined,
    // End new stuff

    matches: [],
    activeMatch: undefined,
    relevantResults: [],
    matchResults: [],
    relevantResult: undefined,
    waitingForMatch: false,
  }
})

@Injectable()
export class MatchState {
  private matchesUnsub: Subscription | undefined;
  private unsubscribeNewMatch: Subscription | undefined;
  private unsubscribeNewMatchResult: Subscription | undefined;
  private matchResultsUnsub: Subscription | undefined;

  constructor(private matchService: MatchService, private router: Router, private store: Store) {
  }

  // New Stuff
  @Selector()
  static currentMatch(state: MatchStateModel): MatchModel {
    return state.currentMatch;
  }


  @Selector()
  static matchResults(state: MatchStateModel): MatchResultsModel[] {
    return state.matchResults;
  }

  @Selector()
  static currentMatchResults(state: MatchStateModel): MatchResultsModel[] {
    return state.currentMatch.matchResults;
  }

  @Selector()
  static relevantResults(state: MatchStateModel): MatchResultsModel[] {
    return state.relevantResults;
  }

  @Action(JoinLobby)
  joinLobby(ctx: StateContext<MatchStateModel>, action: JoinLobby){
    this.matchService.joinLobby(action.user);
  }

  @Action(ListenForNewMatchCreated)
  listenForNewMatchCreated(ctx: StateContext<MatchStateModel>){
    this.matchService.listenForNewMatchCreated()
      .pipe(
        tap(match => {
          ctx.dispatch(new MatchUpdated(match, MatchUpdateType.New));
        })
      ).subscribe();
  }

  @Action(ListenForMatchFound)
  listenForMatchFound(ctx: StateContext<MatchStateModel>){
    this.matchService.listenForMatchFound()
      .pipe(
        tap(match => {
          ctx.dispatch(new MatchUpdated(match, MatchUpdateType.Found));
        })
      ).subscribe();
  }

  @Action(ListenForJoinedMatch)
  listenForJoinedMatch(ctx: StateContext<MatchStateModel>){
    this.matchService.listenForJoinedMatch()
      .pipe(
        tap(match => {
          ctx.dispatch(new MatchUpdated(match, MatchUpdateType.Joined));
        })
      ).subscribe();
  }

  @Action(MatchUpdated)
  matchUpdated(ctx: StateContext<MatchStateModel>, action: MatchUpdated){
    switch (action.type) {
      case MatchUpdateType.Found: {
        ctx.setState({
          ...ctx.getState(),
          currentMatch: action.match
        });
        break;
      }
      case MatchUpdateType.New: {
        ctx.setState({
          ...ctx.getState(),
          currentMatch: action.match
        });
        this.store.dispatch(new LoggedInUserUpdate(action.match.matchResults[0].user));
        this.store.dispatch(new UpdateMatch(action.match));
        break;
      }
      case MatchUpdateType.Joined: {
        const state = ctx.getState();
        if (state.currentMatch.id === action.match.id) {
          ctx.setState({
            ...ctx.getState(),
            currentMatch: action.match
          });
        }
        break;
      }
    }
    if (ctx.getState().currentMatch !== null && ctx.getState().currentMatch.matchResults.length > 0)
    {
      console.log('RAMMMMMM', ctx.getState().currentMatch);
      this.router.navigateByUrl('/Lobby/' + ctx.getState().currentMatch.id);
    }
  }
  @Action(UpdateMatchResult)
  updateMatchResult(ctx: StateContext<MatchStateModel>, updateMatchResult: UpdateMatchResult) {
    this.matchService.updateMatchResult(updateMatchResult.matchResult.id, updateMatchResult.matchResult);
    }

  @Action(UpdateMatch)
  updateMatch(ctx: StateContext<MatchStateModel>, updateMatch: UpdateMatch) {
    const match = {...ctx.getState().currentMatch};
    match.hasEnded = updateMatch.updatedMatch.hasEnded;
    ctx.setState({
      ...ctx.getState(),
      currentMatch: match
    });

  }

  @Action(ListenForMatchResults)
  getMatchResults(ctx: StateContext<MatchStateModel>) {
    if (this.matchResultsUnsub)
    {
      this.matchResultsUnsub.unsubscribe();
    }
    this.matchResultsUnsub = this.matchService.listenForMatchResults().subscribe(matchResults => {
      ctx.dispatch(new UpdateMatchResults(matchResults));
    });
    this.matchService.getAllMatchResults();
  }

  @Action(UpdateMatchResults)
  updateMatchResults(ctx: StateContext<MatchStateModel>, um: UpdateMatchResults): void {
    const state = ctx.getState();
    const newMatch = {...state.currentMatch};
    const newState: MatchStateModel = {
      ...state,
      matchResults: um.matchResults,
      currentMatch: newMatch,
    };
    ctx.setState(newState);
    um.matchResults.forEach(result => {
      if (result.match.id === ctx.getState().currentMatch.id && result.result === true)
      {
        const endState: MatchStateModel = {
          ...state,
          matchResults: um.matchResults,
          currentMatch: null,
        };
        ctx.setState(endState);
        this.router.navigateByUrl('/Profile');
      }
    });
  }
}
