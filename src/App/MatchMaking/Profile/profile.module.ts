import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';

import {ProfileRoutingModule} from './profile-routing.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {UserState} from './state/user.state';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    ProfileComponent,
  ],


    imports: [
        ProfileRoutingModule,
        CommonModule,
      ReactiveFormsModule,
      FlexModule,
      NgxsModule.forFeature([UserState])
    ]
})
export class ProfileModule { }
