import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChatComponent} from './MatchMaking/Chat/chat.component';


const routes: Routes = [
  { path: 'Chat', loadChildren: () => import('./MatchMaking/Chat/chat.module').then(m => m.ChatModule) },
  { path: 'Profile', loadChildren: () => import('./MatchMaking/Profile/profile.module').then(m => m.ProfileModule)}
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
