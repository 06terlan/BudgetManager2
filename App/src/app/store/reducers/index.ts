import { loadingReducer } from './loading.reducer';
import { loginReducer } from './login.reducer';
import { walletReducer } from './wallet.reducer';
import { categoryReducer } from "./category.reducer";
import { tranReducer } from "./tran.reducer";

export const reducers = {
    loadingReducer : loadingReducer,
    loginReducer: loginReducer,
    walletReducer: walletReducer,
    categoryReducer: categoryReducer,
    tranReducer: tranReducer
};
