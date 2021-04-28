import {Component, OnInit} from '@angular/core';
import {ListenForMatches} from './state/match.actions';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../Profile/state/user.state';
import {Observable, Subject} from 'rxjs';
import {UserModel} from '../shared/user.model';
import {MatchState} from './state/match.state';
import {MatchModel} from '../shared/match.model';


@Component({
  selector: 'app-chat',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit
{
  @Select(MatchState.matches) matches$: Observable<MatchModel[]> | undefined;

  unsubscribe$ = new Subject();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new ListenForMatches());
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
