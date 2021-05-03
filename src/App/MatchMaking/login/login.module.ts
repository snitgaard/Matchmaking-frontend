import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FlexModule} from '@angular/flex-layout';
import {NgxsModule} from '@ngxs/store';
import {UserState} from '../Profile/state/user.state';
import {LoginState} from './state/login.state';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
  ],

  imports: [
    LoginRoutingModule,
    MatFormFieldModule,
    NgxsModule.forFeature([LoginState]),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FlexModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
