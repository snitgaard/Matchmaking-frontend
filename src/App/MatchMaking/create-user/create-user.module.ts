import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FlexModule} from '@angular/flex-layout';
import {CreateUserComponent} from './create-user.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    CreateUserComponent,
  ],

  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FlexModule,
    ReactiveFormsModule
  ]
})
export class CreateUserModule { }
