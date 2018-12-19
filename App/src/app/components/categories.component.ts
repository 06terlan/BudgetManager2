import {Component, Inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {CategoryActions} from "../store/actions/category.action";
import {LoadingActions} from "../store/actions/loading.action";
import {WalletActions} from "../store/actions/wallet.action";
import {DialogData, WalletDialog} from "./main.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {UserDataService} from "../services/userdata.service";
import {DeleteWalletDialog} from "./wallet.component";

export interface CategoryDialogData {
  name: String,
  parent: String,
  type: String,
  icon: String,
}

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styles: ['button{width:100%}']
})
export class CategoriesComponent {
  private categories = [];
  private selected = 0;

  constructor(public dialog: MatDialog, private userDataService: UserDataService, private store: Store<any>){}

  ngOnInit(){
    this.store.select('categoryReducer').subscribe(d => {
      this.categories = d.categories;
      this.selected = d.selected;
    });
  }

  select(e, num){
    this.store.dispatch({type: CategoryActions.CATEGORY_CHANGE, selected: num });
  }

  isActive(num){
    return this.selected==num;
  }

  addCategory(){
    const dialogRef = this.dialog.open(CategoryDialog, {
      width: '300px',
      data: {
        name: "",
        type: "expense",
        parent: "root",
        icon: "money",
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch({type: LoadingActions.SHOW_LOADING });
        this.userDataService.addCategory(result)
          .then(d=>{
            this.store.dispatch({type: CategoryActions.CATEGORY_ADD, categories: [d.category] });
            this.store.dispatch({type: LoadingActions.HIDE_LOADING });
          })
          .catch(e=>{
            this.store.dispatch({type: LoadingActions.HIDE_LOADING });
          });
      }

    });
  }

  deleteCategory(category, num){
    const dialogRef = this.dialog.open(DeleteCategoryDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch({type: LoadingActions.SHOW_LOADING });
        this.userDataService.deleteCategory(category)
          .then(d=>{
            this.store.dispatch({type: CategoryActions.CATEGORY_DELETE, categories: category});
            this.store.dispatch({type: LoadingActions.HIDE_LOADING });
            if(this.selected === num) this.store.dispatch({type: CategoryActions.CATEGORY_CHANGE, selected: 0 });
          })
          .catch(e=>{
            this.store.dispatch({type: LoadingActions.HIDE_LOADING });
          });
      }

    });

    return false;
  }

}

@Component({
  selector: 'category-dialog',
  template: `
		<h1 mat-dialog-title>Add category</h1>
		<div mat-dialog-content>
			<mat-form-field>
				<input matInput [(ngModel)]="data.name" placeholder="Name" required>
			</mat-form-field>
			<mat-form-field>
        <mat-select [(ngModel)]="data.type" placeholder="Type">
          <mat-option value="expense">Expense</mat-option>
          <mat-option value="income">Income</mat-option>
        </mat-select>
			</mat-form-field>
      <mat-form-field>
        <mat-select [(ngModel)]="data.parent" placeholder="Parent" required>
          <mat-option aria-selected="true" value="root">Root</mat-option>
          <mat-option *ngFor="let item of categories" [value]="item.name">{{item.name}}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <input matInput [(ngModel)]="data.icon" placeholder="Icon" required>
      </mat-form-field>
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="close()">Close</button>
			<button mat-button [mat-dialog-close]="{name: data.name, type: data.type, parent: data.parent, icon: data.icon}" cdkFocusInitial>Save</button>
		</div>
	`,
})
export class CategoryDialog {
  public categories = [];
  constructor(public dialogRef: MatDialogRef<CategoryDialog>, @Inject(MAT_DIALOG_DATA) public data: CategoryDialogData, private store: Store<any>) {}
  ngOnInit(){
    this.store.select('categoryReducer').subscribe(d => {
      this.categories = d.categories;
    });
  }
  close(): void {this.dialogRef.close();}
}

@Component({
  selector: 'delete-category-dialog',
  template: `
		<h1 mat-dialog-title>Delete category</h1>
		<div mat-dialog-content>
			Are you sure?
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="close()">Close</button>
			<button mat-button [mat-dialog-close]="{}" cdkFocusInitial>Delete</button>
		</div>
	`,
})

export class DeleteCategoryDialog {
  constructor(public dialogRef: MatDialogRef<DeleteCategoryDialog>, @Inject(MAT_DIALOG_DATA) public data) {}
  close(): void { this.dialogRef.close(); }
}
