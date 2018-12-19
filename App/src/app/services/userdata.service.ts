import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginActions } from '../store/actions/login.action';
import { WalletActions } from '../store/actions/wallet.action';
import {CategoryActions} from "../store/actions/category.action";


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
	private categoriesUrl:string = "http://127.0.0.1:4000/api/categories";
	private categoryAddUrl:string = "http://127.0.0.1:4000/api/category/add";
	private walletDeleteUrl:string = "http://127.0.0.1:4000/api/wallet/delete";
	private transactionsUrl:string = "http://127.0.0.1:4000/api/transactions";

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

	getTransactions(wallet){
		return this.http.get<any>(this.transactionsUrl, {params: {wallet: wallet}}).toPromise();
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

    getCategories(){
      return this.http.get<any>(this.categoriesUrl).toPromise();
    }

    addCategory(category){
      return this.http.post<any>(this.categoryAddUrl, category).toPromise();
    }

	logout(){
		this.store.dispatch({type: LoginActions.LOGOUT});
		this.store.dispatch({type: WalletActions.WALLET_CLEAR});
		this.store.dispatch({type: CategoryActions.CATEGORY_CLEAR});
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
