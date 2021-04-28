import {NgModule} from '@angular/core';
import {CreateUserComponent} from './create-user.component';
import {CreateUserRoutingModule} from './create-user-routing.module';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CreateUserComponent,
  ],

    imports: [
        CreateUserRoutingModule,
        ReactiveFormsModule
    ]
})
export class CreateUserModule { }
