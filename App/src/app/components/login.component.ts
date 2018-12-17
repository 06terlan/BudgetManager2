import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from '../services/userdata.service';
import { Router } from '@angular/router';

@Component({
	selector: '',
	templateUrl: './login.component.html',
	styles: []
})
export class LoginComponent{
	loginForm:FormGroup;
	loginError:boolean = false;
	private hide:boolean = true;

	constructor(formBuilder:FormBuilder, private userDataService:UserDataService, private router:Router){
		this.loginForm = formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	onSubmit(){
		this.userDataService.loginUser(this.loginForm.value)
			.then((d)=>{
				this.loginError = false;
				localStorage.setItem('token', d.token);
				this.router.navigate(['protected']);
			})
			.catch(err=>{
				this.loginError = true;
			});
	}
}
