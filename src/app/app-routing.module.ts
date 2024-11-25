import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailComponent } from './user/profile-detail/profile-detail.component';

const routes: Routes = [
  { path: 'profile/:id', component: ProfileDetailComponent },
  // otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}