import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from '../services/userdata.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadingActions } from '../store/actions/loading.action';

@Component({
	selector: '',
	templateUrl: './login.component.html',
	styles: []
})
export class LoginComponent{
	loginForm:FormGroup;
	loginError:boolean = false;
	private hide:boolean = true;

	constructor(formBuilder:FormBuilder, private userDataServcie:UserDataService, private router:Router, private store:Store<any>){
		this.loginForm = formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	onSubmit(){
		this.store.dispatch({type: LoadingActions.SHOW_LOADING });
		this.userDataServcie.loginUser(this.loginForm.value)
			.then((d)=>{
				this.loginError = false;
				this.userDataServcie.loggedIn(d.token);
				this.router.navigate(['app']);
				this.store.dispatch({type: LoadingActions.HIDE_LOADING });
			})
			.catch(err=>{
				this.loginError = true;
				this.store.dispatch({type: LoadingActions.HIDE_LOADING });
			});
	}
}
