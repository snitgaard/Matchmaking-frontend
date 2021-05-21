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
  ///This is new
  currentMatch: MatchModel;
  //End new stuff
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
    ///This is new
    currentMatch: undefined,
    //End new stuff

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

  //New Stuff
  @Selector()
  static currentMatch(state: MatchStateModel): MatchModel {
    return state.currentMatch;
  }


  @Selector()
  static matchResults(state: MatchStateModel): MatchResultsModel[] {
    return state.matchResults;
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
        })
        break;
      }
      case MatchUpdateType.New: {
        ctx.setState({
          ...ctx.getState(),
          currentMatch: action.match
        })
        //connectUserDto.lobbyLeader = true;
        //await this.userService.updateUser(connectUserDto.id, connectUserDto);
        /// console.log("QueerIT", connectUserDto.username + connectUserDto.lobbyLeader)


        const loggedInUser = {...this.store.selectSnapshot(LoginState.loggedInUser)};
        loggedInUser.lobbyLeader = true;
        this.store.dispatch(new LoggedInUserUpdate(loggedInUser));
        this.store.dispatch(new UpdateUser(loggedInUser));
        break;
      }
      case MatchUpdateType.Joined: {
        const state = ctx.getState();
        if(state.currentMatch.id === action.match.id) {
          ctx.setState({
            ...ctx.getState(),
            currentMatch: action.match
          })
        }
        break;
      }
    }
    this.router.navigateByUrl('/Lobby/' + ctx.getState().currentMatch.id);
  }
  @Action(UpdateMatchResult)
  updateMatchResult(ctx: StateContext<MatchStateModel>, updateMatchResult: UpdateMatchResult) {
    this.matchService.updateMatchResult(updateMatchResult.matchResult.id, updateMatchResult.matchResult);
  }


  //New Stuff END






















  /*
  @Selector()
  static relevantResults(state: MatchStateModel): MatchResultsModel[] {
    return state.relevantResults;
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
  updateMatchResults(ctx: StateContext<MatchStateModel>, um: UpdateMatchResults): void {
    const state = ctx.getState();
    const newState: MatchStateModel = {
      ...state,
      matchResults: um.matchResults,
    };
    ctx.setState(newState);

  }

  @Action(UpdateMatch)
  updateMatch(ctx: StateContext<MatchStateModel>, updateMatch: UpdateMatch) {
    this.matchService.updateMatch(updateMatch.updatedMatch.id, updateMatch.updatedMatch);
  }

  @Action(GetUsersOnMatch)
  getUsersOnMatch(ctx: StateContext<MatchStateModel>) {
    const state = ctx.getState();
    const activeMatch = state.activeMatch;
    const matchResults = state.matchResults;
    const relevantResults: MatchResultsModel[] = [
      ...matchResults.filter(mr => mr.match.id === activeMatch.id)
    ];
    ctx.setState({
      ...state,
      relevantResults: relevantResults,
    })
  }

  @Action(NewMatch)
  newMatch(ctx: StateContext<MatchStateModel>) {
    this.unsubscribeNewMatch = this.matchService.listenForNewMatch().subscribe(match => {
      ctx.dispatch(new NewMatchCreated(match));
    });
  }

  @Action(NewMatchCreated)
  newMatchCreated(ctx: StateContext<MatchStateModel>, action: NewMatchCreated) {
    const state = ctx.getState();
    const newMatches = [...state.matches];
    newMatches.push(action.match);
    ctx.setState({
      ...state,
      matches: newMatches,
      activeMatch: state.waitingForMatch ? action.match : state.activeMatch,
    });
    if(ctx.getState().waitingForMatch) {
      ctx.dispatch(new QueUp());
    }
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
  createMatchResult(ctx: StateContext<MatchStateModel>, createMatchResult: CreateMatchResult) {
    return this.matchService.createMatchResult({
      id: createMatchResult.resultPayload.id,
      result: createMatchResult.resultPayload.result,
      match: createMatchResult.resultPayload.match,
      user: createMatchResult.resultPayload.user
    });
  }

  @Action(NewMatchResult)
  newMatchResult(ctx: StateContext<MatchStateModel>) {
    this.unsubscribeNewMatchResult = this.matchService.listenForNewMatchResult().subscribe(matchResult => {
      ctx.dispatch(new UpdateMatchResult(matchResult));
    });
  }

  @Action(UpdateMatchResult)
  updateMatchResult(ctx: StateContext<MatchStateModel>, um: UpdateMatchResult): void {
    const state = ctx.getState();
    const matchResults = [...state.matchResults]
    if(!matchResults.find(mr => mr.id === um.matchResult.id)) {
      matchResults.push(um.matchResult);
      const newState: MatchStateModel = {
        ...state,
        matchResults: matchResults,
      };
      ctx.setState(newState);

    }
    ctx.dispatch(new GetUsersOnMatch());
    if(um.matchResult.user.id === this.store.selectSnapshot(LoginState.loggedInUser)?.id) {
      this.router.navigateByUrl('/Lobby/' + state.activeMatch.id);
    }

  }

  @Action(QueUp)
  queUp(ctx: StateContext<MatchStateModel>, action: QueUp): void {
    const matches = ctx.getState().matches;
    const availableMatchResult = matches.find(m => !m.matchResults || m.matchResults.length === 0 || m.matchResults.length === 1 );
    if(!availableMatchResult) {
      ctx.setState({
        ...ctx.getState(),
        waitingForMatch: true
      })
      ctx.dispatch(new CreateMatch({
        id: undefined,
        score: '0-0',
        matchResults: [],
      }));
    } else {
      ctx.setState({
        ...ctx.getState(),
        waitingForMatch: false,
        activeMatch: availableMatchResult,
      })
      const activeMatch: MatchModel = availableMatchResult;

      const matchResultDto: MatchResultsModel = {
        id: undefined,
        result: false,
        match: activeMatch,
        user: this.store.selectSnapshot(LoginState.loggedInUser)
      };
      ctx.dispatch(new CreateMatchResult(matchResultDto));
    }
  }
*/
}
