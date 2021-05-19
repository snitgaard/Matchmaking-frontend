import {Component, OnDestroy, OnInit} from '@angular/core';
import {ofActionSuccessful, Select, Store} from '@ngxs/store';
import {UserState} from './state/user.state';
import {Observable, Subject} from 'rxjs';
import {UserModel} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {ListenForUsers, StopListeningForUsers, UpdateUser, UpdateUsers} from './state/user.actions';
import {takeUntil} from 'rxjs/operators';
import {LoginState} from '../login/state/login.state';
import {LoadUserFromStorage, RemoveUserFromStorage, UserLoggedIn} from '../login/state/login.actions';
import {AuthUserModel} from '../shared/auth-user.model';
import {
  CreateMatch,
  CreateMatchResult,
  ListenForMatches, ListenForMatchResults,
  NewMatch, StopListeningForMatches,
  UpdateMatch,
  UpdateMatches
} from '../Lobby/state/match.actions';
import {MatchModel} from '../shared/match.model';
import {MatchState} from '../Lobby/state/match.state';
import {FormBuilder} from '@angular/forms';
import {MatchDto} from '../shared/match.dto';
import {NewMessage} from '../Chat/state/chat.actions';
import {MatchResultsModel} from '../shared/match-results.model';
import {insertItem} from '@ngxs/store/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy
{
  @Select(UserState.users) users$: Observable<UserModel[]> | undefined;
  @Select(MatchState.matches) matches$: Observable<MatchModel[]> | undefined;
  @Select(LoginState.loggedInUser) loggedInUser$: Observable<UserModel> | undefined;
  @Select(MatchState.activeMatch) activeMatch$: Observable<MatchModel> | undefined;
  @Select(MatchState.matchResults) matchResults$: Observable<MatchResultsModel[]> | undefined;

  // loggedInUser: AuthUserModel;

  unsubscribe$ = new Subject();
  activeMatches: MatchModel[] = [];
  relevantResults: MatchResultsModel[] = [];
  activeMatch: MatchModel;
  testUser: UserModel[] = [];
  matchFb = this.fb.group({
    score: [''],
    matchResults: ['']
  });
  matchResultFb = this.fb.group({
    result: [''],
    match: [''],
    user: [''],
  });
  loggedInUser = {...this.store.selectSnapshot(LoginState.loggedInUser)};

  constructor(private store: Store, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new ListenForUsers());
    this.store.dispatch(new NewMatch());
    this.store.dispatch(new ListenForMatches());
    this.store.dispatch(new ListenForMatchResults());
    this.getMatchHistory();
    // this.store.dispatch(new LoadUserFromStorage());
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.store.dispatch(new StopListeningForUsers());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  queueUp(): void {
    console.log({...this.store.selectSnapshot(MatchState.matches)});
    console.log({...this.store.selectSnapshot(UserState.users)});

    this.findActiveMatches();

    if (this.activeMatches.length <= 0)
    {
      this.createMatch();
      this.findActiveMatches();
    }
  }

  findActiveMatches(): void {
    this.matches$.pipe(takeUntil(this.unsubscribe$)).subscribe((matches) => {
      matches.forEach(activeMatch => {
        if (activeMatch.matchResults === undefined)
        {
          return;
        }
        if (activeMatch.matchResults.length === 0 || activeMatch.matchResults.length === 1)
        {
          console.log(activeMatch, 'idk whats happenin');
          this.activeMatches.push(activeMatch);
          this.matchResultFb.patchValue({
            result: false,
            match: activeMatch,
            user: this.loggedInUser
          });
          const matchResultDto: MatchResultsModel = this.matchResultFb.value;
          this.store.dispatch(new CreateMatchResult(matchResultDto));
          this.unsubscribe$.next();
          this.unsubscribe$.complete();
          this.activeMatch = activeMatch;
          this.router.navigateByUrl('/Lobby/' + this.activeMatch.id);
        }
      });
    });
  }

  createMatch(): void {
    this.matchFb.patchValue({
      score: '0-0',
      matchResults: []
    });
    const matchDto: MatchModel = this.matchFb.value;
    this.store.dispatch(new CreateMatch(matchDto));
    console.log(matchDto);
  }

  getMatchHistory(): void {
    const loggedInUser = {...this.store.selectSnapshot(LoginState.loggedInUser)};
    this.matchResults$.pipe(takeUntil(this.unsubscribe$)).subscribe((matchResults) => {
      matchResults.forEach(relevantResult => {
        const index = this.relevantResults.findIndex(result => result.id === relevantResult.id);
        if (relevantResult.user.id === loggedInUser.id && index === -1)
        {
          this.relevantResults.push(relevantResult);
        }
      });
    });
  }

  logout(): void {
    this.store.dispatch(new RemoveUserFromStorage);
  }

}
