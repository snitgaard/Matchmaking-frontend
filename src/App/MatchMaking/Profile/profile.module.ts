import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';

import {ProfileRoutingModule} from './profile-routing.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {UserState} from './state/user.state';


@NgModule({
  declarations: [
    ProfileComponent,
  ],

    imports: [
        ProfileRoutingModule,
        CommonModule,
      ReactiveFormsModule,
      NgxsModule.forFeature([UserState])
    ]
})
export class ProfileModule { }
