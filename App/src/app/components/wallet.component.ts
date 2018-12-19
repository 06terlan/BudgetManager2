import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { WalletActions } from '../store/actions/wallet.action';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserDataService } from '../services/userdata.service';
import { LoadingActions } from '../store/actions/loading.action';
import { TranActions } from '../store/actions/tran.action';

@Component({
    selector: 'app-wallets',
    template: `
    <div *ngFor="let wallet of wallets; let num=index;" class='wallet'>
        <button [ngClass]="{active: isActive(num)}" mat-raised-button color="warn" (click)="select(num)"
            matBadge="{{ wallet.balance }}" matBadgePosition="after" matBadgeColor="accent">
            {{ wallet.name }} <mat-icon (click)="delete(wallet, num)">delete</mat-icon>
        </button>
    </div>
    `,
    styles: ['.wallet{ margin-top:5px; }', 'button{width:100%}', '.mat-badge-content{width: auto;padding: 2px;right: 1% !important;}']
})
export class WalletComponent{
    public wallets = [];
    private selected = 0;
    private lastData = -1;
    constructor(private store:Store<any>, public dialog: MatDialog, private userDataService:UserDataService){}

    ngOnInit(){
        const serv = this.userDataService;
        this.store.select('walletReducer').subscribe(d=>{
            this.wallets = d.wallets;
            this.selected = d.selected;

            if(this.lastData != d.selected && d.wallets[d.selected]){
                this.lastData = d.selected;
                this.store.dispatch({type: LoadingActions.SHOW_LOADING });
                this.userDataService.getTransactions(d.wallets[d.selected]._id)
                .then(d=>{
                    this.store.dispatch({type: TranActions.TRAN_CLEN_ADD, transactions: d.transactions });
                    this.store.dispatch({type: LoadingActions.HIDE_LOADING });
                })
                .catch(e=>{
                    this.store.dispatch({type: LoadingActions.HIDE_LOADING });
                })
            }
        });
    }

    select(num){
        this.store.dispatch({type: WalletActions.WALLET_CHAGE, selected: num });
        return false;
    }

    delete(wallet, num){
        const dialogRef = this.dialog.open(DeleteWalletDialog, {
			width: '250px'
		  });

		  dialogRef.afterClosed().subscribe(result => {
              if(result){
                this.store.dispatch({type: LoadingActions.SHOW_LOADING });
				this.userDataService.deleteWallet(wallet)
					.then(d=>{
						this.store.dispatch({type: WalletActions.WALLET_DELETE, wallet: wallet });
                        this.store.dispatch({type: LoadingActions.HIDE_LOADING });
                        if(this.selected === num) this.store.dispatch({type: WalletActions.WALLET_CHAGE, selected: 0 });
					})
					.catch(e=>{
						this.store.dispatch({type: LoadingActions.HIDE_LOADING });
					});
              }
				
          });

          return false;
    }

    isActive(num){
        return this.selected==num;
    }
}



// add wallet dialog
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
