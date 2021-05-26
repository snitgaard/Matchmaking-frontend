import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SocketApp} from '../../app.module';
import {MatchModel} from './match.model';
import {UserModel} from './user.model';
import {MatchDto} from './match.dto';
import {MatchResultsModel} from './match-results.model';


@Injectable({
  providedIn: 'root'
})
export class MatchService {
  matchModel: MatchModel | undefined;
  constructor(private socketApp: SocketApp) {
  }

  // New Stuff
  joinLobby(user: UserModel) {
    this.socketApp.emit('joinLobby', user);
  }

  listenForNewMatchCreated(): Observable<MatchModel> {
    return this.socketApp.fromEvent<MatchModel>('NewMatchCreatedForMe');
  }

  listenForMatchFound(): Observable<MatchModel> {
    return this.socketApp.fromEvent<MatchModel>('MatchFoundForMe');
  }

  listenForJoinedMatch(): Observable<MatchModel> {
    return this.socketApp.fromEvent<MatchModel>('SomeoneJoinedMatch');
  }

  updateMatchResult(id: string, matchResult: MatchResultsModel): void {
    this.socketApp.emit('updateMatchResult', matchResult);
  }

  createMatch(match: MatchModel) {
    this.socketApp.emit('create-match', match);
  }

  createMatchResult(matchResult: MatchResultsModel) {
    this.socketApp.emit('create-matchresult', matchResult);
  }

  listenForNewMatch(): Observable<MatchModel> {
    return this.socketApp.fromEvent<MatchModel>('new-match');
  }

  listenForNewMatchResult(): Observable<MatchResultsModel> {
    return this.socketApp.fromEvent<MatchResultsModel>('new-matchresult');
  }

  updateMatch(id: string, match: MatchModel): void {
    this.socketApp.emit('updateMatch', match);
  }

  listenForCreateSuccess(): Observable<MatchDto> {
    return this.socketApp.fromEvent<MatchDto>('match-created-success');
  }

  listenForCreateError(): Observable<string> {
    return this.socketApp.fromEvent<string>('match-created-error');
  }

  listenForMatchResults(): Observable<MatchResultsModel[]> {
    return this.socketApp.fromEvent<MatchResultsModel[]>('matchResults');
  }

  getAllMatches(): void {
    this.socketApp.emit('getAllMatches');
  }

  getAllMatchResults(): void {
    this.socketApp.emit('getAllMatchResults');
  }

}
