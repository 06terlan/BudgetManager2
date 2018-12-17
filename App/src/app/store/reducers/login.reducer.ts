import { LoginActions } from '../actions/login.action';

interface LoginState {
    loggedIn : boolean
}

const initialState:LoginState = {
    loggedIn: !!localStorage.getItem('token')
}

export function loginReducer(state:LoginState = initialState, action){
    switch(action.type){
        case LoginActions.LOGIN:
            return { ...state, loggedIn: true };
        case LoginActions.LOGOUT:
            return { ...state, loggedIn: false};
    }
    return state;
}