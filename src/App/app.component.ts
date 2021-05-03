import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {LoginState} from './MatchMaking/login/state/login.state';
import {Observable} from 'rxjs';
import {UserModel} from './MatchMaking/shared/user.model';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Select(LoginState.loggedInUser) loggedInUser$: Observable<UserModel> | undefined;
  title = 'matchmaking-frontend';
}
