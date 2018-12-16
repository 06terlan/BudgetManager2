import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import { UserDataServcie } from '../services/userdata.service';
import { Router } from '@angular/router';
import { Observable } from "rxjs";

@Component({
	selector: '',
	templateUrl: './register.component.html',
	styles: []
})
export class RegisterComponent{
	private myForm: FormGroup;

	constructor(private formBuilder:FormBuilder, private userDataServcie:UserDataServcie, private router:Router){

		this.myForm = formBuilder.group({
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			email: ['', [Validators.required, Validators.email], this.checkEmail.bind(this)],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirm: ['', [Validators.required]],
			accept: ['', Validators.required]
		}, {validator: this.confirmPassword})
	}

	onSubmit() {
	    this.userDataServcie.registerUser(this.myForm.value)
	    	.then((d)=>{
	    		this.router.navigate(['login']);
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