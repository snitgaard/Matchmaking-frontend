import {MatchModel} from "../../shared/match.model";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Subscription} from "rxjs";
import {ListenForMatches, UpdateMatches} from "./match.actions";
import {MatchService} from "../../shared/match.service";



export interface MatchStateModel {
  matches: MatchModel[];
  relevantMatch: MatchModel | undefined;

}

@State<MatchStateModel>({
  name: 'match',
  defaults: {
    matches: [],
    relevantMatch: undefined,

  }
})
@Injectable()
export class MatchState {
  private matchesUnsub: Subscription | undefined;

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

  @Action(ListenForMatches)
  getMatches(ctx: StateContext<MatchStateModel>){
    if(this.matchesUnsub)
    {
      this.matchesUnsub.unsubscribe();
    }
    this.matchesUnsub = this.matchService.listenForMatches().subscribe(matches => {
      ctx.dispatch(new UpdateMatches(matches));
    });
    this.matchService.getAllMatches();
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
}
