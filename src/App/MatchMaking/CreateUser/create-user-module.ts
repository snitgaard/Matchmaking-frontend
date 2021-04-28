import {NgModule} from '@angular/core';
import {CreateUserComponent} from './create-user.component';
import {CreateUserRoutingModule} from './create-user-routing.module';



@NgModule({
  declarations: [
    CreateUserComponent,
  ],

  imports: [
    CreateUserRoutingModule
  ]
})
export class CreateUserModule { }
