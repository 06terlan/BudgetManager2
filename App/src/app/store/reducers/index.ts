import { loadingReducer } from './loading.reducer';
import { loginReducer } from './login.reducer';
import { walletReducer } from './wallet.reducer';
import { categoryReducer } from "./category.reducer";

export const reducers = {
    loadingReducer : loadingReducer,
    loginReducer: loginReducer,
    walletReducer: walletReducer,
    categoryReducer: categoryReducer
};
