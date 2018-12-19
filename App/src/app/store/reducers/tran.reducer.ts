import { TranActions } from '../actions/tran.action';

const initialState = {
    transactions: []
}

export function tranReducer(state = initialState, action){
    switch(action.type){
        case TranActions.TRAN_ADD:
            return { transactions: [...state.transactions, ...action.transactions] };
        case TranActions.TRAN_CLEN_ADD:
            return { transactions: [...action.transactions] };
    }

    return state;
}