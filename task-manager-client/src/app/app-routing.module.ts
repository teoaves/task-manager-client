import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "src/guard/authentication.guard";

export const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./my-components/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    data: { role: 'ROLE_ADMIN' },
    loadChildren: () => import('./my-components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user',
    canActivate: [AuthenticationGuard],
    data: { role: 'ROLE_ADMIN' },
    loadChildren: () => import('./my-components/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'task',
    canActivate: [AuthenticationGuard],
    data: { role: 'ROLE_ADMIN' },
    loadChildren: () => import('./my-components/task/task.module').then(m => m.TaskModule)
  },
  {
    path: 'task-series',
    canActivate: [AuthenticationGuard],
    data: { role: 'ROLE_ADMIN,ROLE_USER'},
    loadChildren: () => import('./my-components/task-series/task-series.module').then(m => m.TaskSeriesModule)
  },
  { path: '**', redirectTo: '/notfound' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
