import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SocketApp} from '../../app.module';
import {MatchModel} from './match.model';
import {UserModel} from "./user.model";




@Injectable({
  providedIn: 'root'
})
export class MatchService {
  matchModel: MatchModel | undefined;
  constructor(private socketApp: SocketApp) { }

  listenForMatches(): Observable<MatchModel[]>{
    return this.socketApp.fromEvent<MatchModel[]>('matches');
  }
  getAllMatches(): void{
    this.socketApp.emit('getAllMatches');
  }
}
