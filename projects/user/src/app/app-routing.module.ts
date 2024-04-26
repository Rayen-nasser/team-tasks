import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './core/guards/user.guard';

const routes: Routes = [

  {
    path:'auth',
  loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
    //canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
