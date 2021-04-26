import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChatComponent} from './MatchMaking/Chat/chat.component';
import {ProfileComponent} from './MatchMaking/Profile/profile.component';


const routes: Routes = [
  {path: 'Chat', component: ChatComponent},
  {path: 'Profile', component: ProfileComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
