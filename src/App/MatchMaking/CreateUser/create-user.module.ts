import {NgModule} from '@angular/core';
import {CreateUserComponent} from './create-user.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    CreateUserComponent,
  ],

  imports: [
    ReactiveFormsModule
  ]
})
export class CreateUserModule { }
