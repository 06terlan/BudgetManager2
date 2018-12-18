import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { MainComponent } from './components/main.component';
import { RegisterComponent } from './components/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard.component';

const ROUTES : Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full'},
	{ path: 'login', component: LoginComponent},
	{ path: 'register', component: RegisterComponent},
	{ 
		path: 'app', component: MainComponent, /*, canActivate: [AuthGuard]*/
		children:[
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{path: 'dashboard', component: DashboardComponent}
		]
	}
];

export const AppRoutes = RouterModule.forRoot(ROUTES);
