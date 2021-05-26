import {NgModule} from '@angular/core';
import {CreateUserComponent} from './create-user.component';
import {CreateUserRoutingModule} from './create-user-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {UserState} from '../Profile/state/user.state';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    CreateUserComponent,
  ],

  imports: [
    CreateUserRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([UserState]),
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    FlexModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class CreateUserModule {
}
