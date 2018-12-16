import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface UserModel{
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

@Injectable()
export class UserDataServcie{
	private registerUrl:string = "http://127.0.0.1:4000/api/register";
	private loginUrl:string = "http://127.0.0.1:4000/api/login";
	private emailCheckUrl:string = "http://127.0.0.1:4000/api/email";

	constructor(private http:HttpClient){}

	registerUser(user:UserModel){
		return this.http.post<any>(this.registerUrl, user).toPromise();
	}

	loginUser(user:UserModel){
		return this.http.post<any>(this.loginUrl, user).toPromise();
	}

	checkEmail(email){
		return this.http.get<any>(this.emailCheckUrl, {params: {email: email}}).toPromise();
	}
}