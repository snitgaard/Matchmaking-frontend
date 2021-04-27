import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';

import {ProfileRoutingModule} from './profile-routing.module';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    ProfileComponent,
  ],

  imports: [
    ProfileRoutingModule,
    FlexModule
  ]
})
export class ProfileModule { }
