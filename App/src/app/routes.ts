import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { ProtectedComponent } from './components/protected.component';
import { RegisterComponent } from './components/register.component';
import { AuthGuard } from './guards/auth.guard';

const ROUTES : Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full'},
	{ path: 'login', component: LoginComponent},
	{ path: 'register', component: RegisterComponent},
	{ path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard]},
	{ path: 'logout', component: ProtectedComponent}
];

export const AppRoutes = RouterModule.forRoot(ROUTES);