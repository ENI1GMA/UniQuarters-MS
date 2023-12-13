import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home-layout/home.component';
import { LayoutComponent } from './features/shared/layout/layout.component';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RoutePaths } from './models/routepaths';
import { RegisterComponent } from './features/register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { UtilisateurModule } from './features/utilisateur/utilisateur.module';
import { Role } from './models/role';
// import { RoleGuard } from './helpers/role.guard';
import { PasswordResetModule } from './features/password-reset/password-reset.module';
import { SchedulerComponent } from './features/bloc/scheduler/scheduler.component';

import { ListUniversiteFilteredComponent } from './features/universite/list-universite-filtered/list-universite-filtered.component';

const routes: Routes = [
  {
    path: `${RoutePaths.LOGIN}`,
    component: LoginComponent,
  },
  {
    path: `${RoutePaths.REGISTER}`,
    component: RegisterComponent,
  },
  {
    path: `${RoutePaths.PASSWORD}`,
    loadChildren: () => PasswordResetModule,
  },
  {
    path: `${RoutePaths.GESTION}`,
    component: LayoutComponent,
    canActivate: [
      AuthGuard,
      //  RoleGuard
    ],
    // data: { role: Role.Admin },
    children: [
      {
        path: `${RoutePaths.DASHBOARD}`,
        component: DashboardComponent,
      },
      {
        path: `${RoutePaths.USER}`,
        loadChildren: () => UtilisateurModule,
      },
      {
        path: `${RoutePaths.UNIVERSITE}`,
        loadChildren: () =>
          import('./features/universite/universite.module').then(
            (m) => m.UniversiteModule
          ),
      },
      {
        path: `${RoutePaths.CHAMBRE}`,
        loadChildren: () =>
          import('./features/chambre/chambre.module').then(
            (m) => m.ChambreModule
          ),
      },
      {
        path: `${RoutePaths.RESERVATION}`,
        loadChildren: () =>
          import('./features/reservation/reservation.module').then(
            (m) => m.ReservationModule
          ),
      },
      {
        path: `${RoutePaths.BLOC}`,
        title: 'Blocs',
        loadChildren: () =>
          import('./features/bloc/bloc.module').then((m) => m.BlocModule),
      },
      {
        // scheduler component
        path: `${RoutePaths.SCHEDULER}`,
        title: 'Schedule',
        component: SchedulerComponent,
      },
    ],
  },
  {
    path: 'loggedIn',
    component: HomeComponent,
    data: { role: Role.Etudiant },
    canActivate: [
      AuthGuard,
      //  RoleGuard
    ],
    children: [
      {
        path: `home`,
        loadChildren: () =>
          import('./features/home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
