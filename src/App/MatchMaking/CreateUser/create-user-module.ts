import {NgModule} from '@angular/core';
import {CreateUserComponent} from './create-user.component';
import {CreateUserRoutingModule} from './create-user-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {UserState} from '../Profile/state/user.state';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    CreateUserComponent,
  ],

  imports: [
    CreateUserRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([UserState]),
    CommonModule
  ]
})
export class CreateUserModule {
}
