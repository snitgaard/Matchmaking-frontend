import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';


const routes: Routes = [
  { path: 'Chat', loadChildren: () => import('./MatchMaking/Chat/chat.module').then(m => m.ChatModule) },
  { path: 'Profile', loadChildren: () => import('./MatchMaking/Profile/profile.module').then(m => m.ProfileModule)},
  { path: 'Login', loadChildren: () => import('./MatchMaking/Login/login.module').then(m => m.LoginModule) },
  { path: 'Lobby', loadChildren: () => import('./MatchMaking/Lobby/lobby.module').then(m => m.LobbyModule) },
  { path: '**', loadChildren: () => import('./MatchMaking/Error/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
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
