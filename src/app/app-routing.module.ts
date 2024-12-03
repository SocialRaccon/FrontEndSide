import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./features/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'feed', loadChildren: () => import('./features/feed/feed.module')
      .then(m => m.FeedModule), canActivate: [authGuard]
  },
  {
    path: 'profile', loadChildren: () => import('./features/profile/profile.module')
      .then(m => m.ProfileModule), canActivate: [authGuard]
  },
  {
    path: ' ', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
