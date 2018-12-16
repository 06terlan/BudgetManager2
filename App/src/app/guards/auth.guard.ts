import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
	constructor(private router:Router){}

	isLoggedIn(){
		return !!localStorage.getItem('token');
	}
	
	canActivate():boolean{
		if(this.isLoggedIn()){
			return true;
		}
		else{
			this.router.navigate(['login']);
			return false;
		}
	}
}