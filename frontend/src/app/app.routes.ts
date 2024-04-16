import { Routes } from '@angular/router';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { LoginComponent } from './pages/login/login.component';
import { MasterComponent } from './shared/layouts/master/master.component';
import { TodoComponent } from './pages/todo/todo.component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';
import {RegisterComponent} from "./pages/register/register.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [guestGuard],
    children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: MasterComponent,
    canActivate: [authGuard],
    children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'todo', component: TodoComponent }
    ],
  },
];
