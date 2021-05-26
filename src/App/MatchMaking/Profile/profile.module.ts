import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';

import {ProfileRoutingModule} from './profile-routing.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    ProfileComponent,
  ],

  imports: [
    ProfileRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FlexModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class ProfileModule {
}
