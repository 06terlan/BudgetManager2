import { LoadingActions } from '../actions/loading.action';
interface LoadingState {
    loading:boolean;
}

const initialState : LoadingState = {
    loading: false
}

export function loadingReducer(state:LoadingState = initialState, action):LoadingState{
    switch(action.type){
        case LoadingActions.SHOW_LOADING:
            return { ...state, loading: true};
        case LoadingActions.HIDE_LOADING:
            return {...state, loading: false};
    }

    return state;
}