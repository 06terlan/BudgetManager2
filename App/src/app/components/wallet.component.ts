import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { WalletActions } from '../store/actions/wallet.action';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserDataService } from '../services/userdata.service';
import { LoadingActions } from '../store/actions/loading.action';

@Component({
    selector: 'app-wallets',
    template: `
    <div *ngFor="let wallet of wallets; let num=index;" class='wallet'>
        <button [ngClass]="{active: isActive(num)}" mat-raised-button color="warn" (click)="select($event,num)"
            matBadge="{{ wallet.balance }}" matBadgePosition="after" matBadgeColor="accent">
            {{ wallet.name }} <mat-icon (click)="delete(wallet)">delete</mat-icon>
        </button>
    </div>
    `,
    styles: ['.wallet{ margin-top:5px; }']
})
export class WalletComponent{
    private wallets = [];
    private selected = 0;
    constructor(private store:Store<any>, public dialog: MatDialog, private userDataService:UserDataService){}

    ngOnInit(){
        this.store.select('walletReducer').subscribe(d=>{
            this.wallets = d.wallets;
            this.selected = d.selected;
        });
    }

    select(e, num){
        this.store.dispatch({type: WalletActions.WALLET_CHAGE, selected: num });
        return false;
    }

    delete(wallet){
        const dialogRef = this.dialog.open(DeleteWalletDialog, {
			width: '250px'
		  });

		  dialogRef.afterClosed().subscribe(result => {
				this.store.dispatch({type: LoadingActions.HIDE_LOADING });
				this.userDataService.deleteWallet(wallet)
					.then(d=>{
						this.store.dispatch({type: WalletActions.WALLET_DELETE, wallet: wallet });
						this.store.dispatch({type: LoadingActions.HIDE_LOADING });
					})
					.catch(e=>{
						this.store.dispatch({type: LoadingActions.HIDE_LOADING });
					});
          });

          return false;
    }

    isActive(num){
        return this.selected==num;
    }
}



// add allet dialog
@Component({
	selector: 'dialog-overview-example-dialog',
	template: `
		<h1 mat-dialog-title>Delete wallet</h1>
		<div mat-dialog-content>
			Are you sure?
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="close()">Close</button>
			<button mat-button [mat-dialog-close]="{}" cdkFocusInitial>Delete</button>
		</div>
	`,
  })
  export class DeleteWalletDialog {

	constructor(
	  public dialogRef: MatDialogRef<DeleteWalletDialog>,
	  @Inject(MAT_DIALOG_DATA) public data) {}

	close(): void {
	  this.dialogRef.close();
	}

  }
