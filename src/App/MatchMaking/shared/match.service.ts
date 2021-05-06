import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SocketApp} from '../../app.module';
import {MatchModel} from './match.model';
import {MatchDto} from './match.dto';



@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor(private socketApp: SocketApp) { }

  /*
  sendMatch(match: MatchDto): void {
    this.socketApp.emit('match', match)
  }
  updateMatch(id: string, match: MatchModel): void {
    this.socketApp.emit('updateMatch', match)
  }
  listenForCreateSuccess(): Observable<MatchDto> {
    return this.socketApp.fromEvent<MatchDto>('match-created-success')
  }
  listenForCreateError(): Observable<string> {
    return this.socketApp.fromEvent<string>('match-created-error')
  }
  listenForMatches(): Observable<MatchModel[]>{
    return this.socketApp.fromEvent<MatchModel[]>("matches")
  }
  listenForMatchList(): void{
    this.socketApp.emit('welcomeMatches')
  }
  joinMatch(dto: MatchModel): void{
    this.socketApp.emit('joinMatch', dto);
  }
*/
}
