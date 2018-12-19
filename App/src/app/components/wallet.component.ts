import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { WalletActions } from '../store/actions/wallet.action';

@Component({
    selector: 'app-wallets',
    template: `
    <div *ngFor="let wallet of wallets; let num=index;" class='wallet'>
        <button [ngClass]="{active: isActive(num)}" mat-raised-button color="warn" (click)="select($event,num)"
            matBadge="{{ wallet.balance }}" matBadgePosition="after" matBadgeColor="accent">
            {{ wallet.name }}
        </button>
    </div>
    `,
    styles: ['.wallet{ margin-top:5px; }']
})
export class WalletComponent{
    private wallets = [];
    private selected = 0;
    constructor(private store:Store<any>){}

    ngOnInit(){
        this.store.select('walletReducer').subscribe(d=>{
            this.wallets = d.wallets;
            this.selected = d.selected;
        });
    }

    select(e, num){
        this.store.dispatch({type: WalletActions.WALLET_CHAGE, selected: num });
    }

    isActive(num){
        return this.selected==num;
    }
}
