import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {ProfileComponent} from '../Profile/profile.component';
import {MatchModel} from '../shared/match.model';
import {MatchState} from './state/match.state';
import {Observable, Subject} from 'rxjs';
import {LoginState} from '../login/state/login.state';
import {takeUntil} from 'rxjs/operators';
import {MatchResultsModel} from '../shared/match-results.model';
import {ListenForMatchResults, NewMatch} from './state/match.actions';


@Component({
  selector: 'app-chat',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit
{
  @Select(MatchState.activeMatch) activeMatch$: Observable<MatchModel> | undefined;
  @Select(MatchState.matchResults) matchResults$: Observable<MatchResultsModel[]> | undefined;
  unsubscribe$ = new Subject();
  relevantResults: MatchResultsModel[] = [];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new ListenForMatchResults());
    this.store.dispatch(new NewMatch());
    this.getUsersOnMatch();
  }

  getUsersOnMatch(): void {
    const activeMatch = {...this.store.selectSnapshot(MatchState.activeMatch)};
    this.matchResults$.pipe(takeUntil(this.unsubscribe$)).subscribe((matchResults) => {
      matchResults.forEach(relevantResult => {
        const index = this.relevantResults.findIndex(result => result.id === relevantResult.id);
        if (relevantResult.match.id === activeMatch.id && index === -1)
        {
          this.relevantResults.push(relevantResult);
        }
      });
    });
  }

}
