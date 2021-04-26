import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../../../../../../../../GitHub/feriehusudlejning-frontend/src/app/shared/services/authentication.service';
import {User} from '../../../../../../../../../../GitHub/feriehusudlejning-frontend/src/app/shared/model/user';
import {UserService} from '../../../../../../../../../../GitHub/feriehusudlejning-frontend/src/app/shared/services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: User;
  isAdminVisible: boolean;
  private isAdminSub: Subscription;

  constructor(private authService: AuthenticationService, private userService: UserService) {


  }

  ngOnInit(): void {
    this.refresh();
    this.isAdminSub = this.authService.isAdmin().subscribe(isAdmin => this.isAdminVisible = isAdmin);

  }

  ngOnDestroy() {
    if (this.isAdminSub) {
      this.isAdminSub.unsubscribe();
    }
  }

  refresh() {
    this.userService.getUserById(this.authService.getUserId()).subscribe(user => {
      this.user = user;
    });
  }

}
