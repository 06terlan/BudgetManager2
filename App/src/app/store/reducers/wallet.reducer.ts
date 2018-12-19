import { WalletActions } from '../actions/wallet.action';

interface WalletState{
    selected: number,
    wallets: any[]
}

const initialState:WalletState = {selected: 0, wallets: []};

export function walletReducer(state:WalletState = initialState, action):WalletState{
    switch(action.type){
        case WalletActions.WALLET_ADD:
            return {selected: state.selected, wallets: [ ...state.wallets, ...action.wallets ]};
        case WalletActions.WALLET_CHAGE:
            return {selected: action.selected, wallets: [ ...state.wallets ]};
        case WalletActions.WALLET_CLEAR:
            return initialState;
        case WalletActions.WALLET_DELETE:
            return {selected: state.selected, wallets: [ ...state.wallets.filter((ele)=>ele!=action.wallet) ]};
    }
    
    return state;
}