import { CategoryActions } from '../actions/category.action';
import {WalletActions} from "../actions/wallet.action";

interface CategoryState{
    selected: number,
    categories: any[]
}

const initialState: CategoryState = {selected: 0, categories: []};

export function categoryReducer(state: CategoryState = initialState, action): CategoryState {
    switch(action.type){
      case CategoryActions.CATEGORY_ADD:
          return {selected: state.selected, categories: [ ...state.categories, ...action.categories ]};
      case CategoryActions.CATEGORY_CHANGE:
          return {selected: action.selected, categories: [ ...state.categories ]};
      case CategoryActions.CATEGORY_CLEAR:
        return initialState;
      case CategoryActions.CATEGORY_DELETE:
        return {selected: state.selected, categories: [ ...state.categories.filter((ele) => ele != action.category) ]};
    }
    
    return state;
}
