import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';

const routes: Routes = [

  {
    path:'auth',
  loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path:'',
    loadChildren: () => import(`./dashboard/dashboard-routing.module`).then(m => m.DashboardRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
