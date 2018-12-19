import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {CategoryActions} from "../store/actions/category.action";


@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styles: []
})
export class CategoriesComponent{
  private categories = [];
  private selected = 0;

  constructor(private store: Store<any>){}

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
}
