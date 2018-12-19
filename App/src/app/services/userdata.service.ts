import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginActions } from '../store/actions/login.action';
import { WalletActions } from '../store/actions/wallet.action';


export interface UserModel{
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

@Injectable()
export class UserDataService{
	private registerUrl:string = "http://127.0.0.1:4000/api/register";
	private loginUrl:string = "http://127.0.0.1:4000/api/login";
	private emailCheckUrl:string = "http://127.0.0.1:4000/api/email";
	private walletsUrl:string = "http://127.0.0.1:4000/api/wallets";
	private walletAddUrl:string = "http://127.0.0.1:4000/api/wallet/add";
	private walletDeleteUrl:string = "http://127.0.0.1:4000/api/wallet/delete";

	constructor(private http:HttpClient, private store:Store<any>){}

	registerUser(user:UserModel){
		return this.http.post<any>(this.registerUrl, user).toPromise();
	}

	loginUser(user:UserModel){
		return this.http.post<any>(this.loginUrl, user).toPromise();
	}

	checkEmail(email){
		return this.http.get<any>(this.emailCheckUrl, {params: {email: email}}).toPromise();
	}

	getWallets(){
		return this.http.get<any>(this.walletsUrl).toPromise();
	}

	addWallet(wallet){
		return this.http.post<any>(this.walletAddUrl, wallet).toPromise();
	}

	deleteWallet(wallet){
		return this.http.delete<any>(this.walletDeleteUrl + "/" + wallet._id).toPromise();
	}

	logout(){
		this.store.dispatch({type: LoginActions.LOGOUT});
		this.store.dispatch({type: WalletActions.WALLET_CLEAR});
		localStorage.removeItem('token');
	}

	loggedIn(token){
		this.store.dispatch({type: LoginActions.LOGIN});
		localStorage.setItem('token', token);
	}

	isLoggedIn() :boolean{
		return !!localStorage.getItem('token');
	}
}