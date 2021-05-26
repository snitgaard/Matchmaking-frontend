import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {LoginState} from './MatchMaking/login/state/login.state';
import {Observable} from 'rxjs';
import {UserModel} from './MatchMaking/shared/user.model';
import {RemoveUserFromStorage} from './MatchMaking/login/state/login.actions';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Select(LoginState.loggedInUser) loggedInUser$: Observable<UserModel> | undefined;
  title = 'matchmaking-frontend';

  constructor(private store: Store) {}

  logout(): void {
    this.store.dispatch(new RemoveUserFromStorage);
  }
}
