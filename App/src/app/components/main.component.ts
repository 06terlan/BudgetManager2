import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserDataService } from '../services/userdata.service';
import { Store } from '@ngrx/store';
import { LoadingActions } from '../store/actions/loading.action';
import { WalletActions } from '../store/actions/wallet.action';
import {CategoryActions} from "../store/actions/category.action";

@Component({
	selector: '',
	templateUrl: './main.component.html',
	styles: ['app-wallets{padding: 10px;}', 'mat-divider{margin-bottom: 15px;}']
})
export class MainComponent{
	animal: string;
	name: string;
  
	constructor(public dialog: MatDialog, private userDataService:UserDataService, private store:Store<any>) 
	{
		this.store.dispatch({type: LoadingActions.SHOW_LOADING });
		this.userDataService.getWallets()
			.then(d=>{
				this.store.dispatch({type: WalletActions.WALLET_ADD, wallets: d.wallets });
				this.store.dispatch({type: LoadingActions.HIDE_LOADING });
			})
			.catch(e=>{
				this.store.dispatch({type: LoadingActions.HIDE_LOADING });
			})
    this.userDataService.getCategories()
      .then(d=>{
        this.store.dispatch({type: CategoryActions.CATEGORY_ADD, categories: d.categories });
        this.store.dispatch({type: LoadingActions.HIDE_LOADING });
      })
      .catch(e=>{
        this.store.dispatch({type: LoadingActions.HIDE_LOADING });
      })
	}

	addWallet(){
		const dialogRef = this.dialog.open(WalletDialog, {
			width: '250px',
			data: {name: this.name, animal: this.animal}
		  });
	  
		  dialogRef.afterClosed().subscribe(result => {
				
		  });
	}
}

// add allet dialog
export interface DialogData {
	balance: number;
	name: string;
}
@Component({
	selector: 'dialog-overview-example-dialog',
	template: `
		<h1 mat-dialog-title>Add wallet</h1>
		<div mat-dialog-content>
			<mat-form-field>
				<input matInput [(ngModel)]="data.name" placeholder="Name" required>
			</mat-form-field>
			<mat-form-field>
				<input matInput [(ngModel)]="data.balance" type="number" placeholder="Balance" required>
			</mat-form-field>
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="close()">No Thanks</button>
			<button mat-button [mat-dialog-close]="{name: data.name, balance: data.balance}" cdkFocusInitial>Save</button>
		</div>
	`,
  })
  export class WalletDialog {
  
	constructor(
	  public dialogRef: MatDialogRef<WalletDialog>,
	  @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
	close(): void {
	  this.dialogRef.close();
	}
  
  }
