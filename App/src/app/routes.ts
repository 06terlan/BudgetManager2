import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { DashboardComponent } from './components/dashboard.component';
import { RegisterComponent } from './components/register.component';
import { AuthGuard } from './guards/auth.guard';

const ROUTES : Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full'},
	{ path: 'login', component: LoginComponent},
	{ path: 'register', component: RegisterComponent},
	{ path: 'dashboard', component: DashboardComponent/*, canActivate: [AuthGuard]*/}
];

export const AppRoutes = RouterModule.forRoot(ROUTES);