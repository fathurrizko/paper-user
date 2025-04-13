import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent, UserListComponent } from '../pages';

const routes: Routes = [
  { path: 'list', component: UserListComponent },
  { path: 'detail', component: UserDetailComponent },
  { path: '**', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
