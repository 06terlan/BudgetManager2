import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import { UserDataService } from '../services/userdata.service';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { LoadingActions } from '../store/actions/loading.action';

@Component({
	selector: '',
	templateUrl: './register.component.html',
	styles: []
})
export class RegisterComponent{
	private registerForm: FormGroup;
	private hide:boolean = true;

	constructor(private formBuilder:FormBuilder, private userDataServcie:UserDataService, private router:Router, private store:Store<any>){

		this.registerForm = formBuilder.group({
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			email: ['', [Validators.required, Validators.email], this.checkEmail.bind(this)],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirm: ['', [Validators.required]],
			accept: ['', Validators.required]
		}, {validator: this.confirmPassword})
	}

	onSubmit() {
		this.store.dispatch({type: LoadingActions.SHOW_LOADING });
	    this.userDataServcie.registerUser(this.registerForm.value)
	    	.then((d)=>{
				this.router.navigate(['login']);
				this.store.dispatch({type: LoadingActions.HIDE_LOADING });
			})
			.catch(err=>{
				this.store.dispatch({type: LoadingActions.HIDE_LOADING });
			});
	}

	confirmPassword(frm: FormGroup): { [s: string]: boolean }{

		if(frm.get('password').value === frm.get('confirm').value) return null;
		else { 
			frm.get('confirm').setErrors({invalid: true}); return {invalid: true}; 
		}
	}

	checkEmail(control:FormControl): Promise<any> | Observable<any>{
		const service = this.userDataServcie;
	    const promise = new Promise<any>(
	      (resolve, reject) => {
	        
	      	service.checkEmail(control.value).then(d=>{
	      		if(d.exist) resolve(d);
	      		else resolve(null);
	      	});
	        
	      }
	    );
	    return promise;
	}
}