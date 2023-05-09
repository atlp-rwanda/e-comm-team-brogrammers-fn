import { configureStore } from '@reduxjs/toolkit';
import booleanReducer from './features/slices/sample';
import loginReducer from './features/slices/login';
import userReducer from './features/slices/user';
import signupReducer from './features/slices/signup';
import logoutReducer from './features/slices/logout';
import passwordReducer from './features/slices/password';
import productSlice from './features/slices/product';
import categoriesReducer from './features/slices/categories';
import addItemReducer from './features/slices/additem';

import collectionSlice from './features/slices/sellerCollection';
import oneProductSlice from './features/slices/oneProduct';
import statusSlice from './features/slices/sellerStatus';
import reviewSlice from './features/slices/productReview';
// import updateSellerCollectionStatus from './features/slices/updateSellerCollectionStatus';
// import statusSlice from './features/slices/sellerStatus';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    user: userReducer,
    boolean: booleanReducer,
    login: loginReducer,
    signup: signupReducer,
    logout: logoutReducer,
    password: passwordReducer,
    products: productSlice.reducer,
    categories: categoriesReducer,
    addedItem: addItemReducer,
    collection: collectionSlice.reducer,

    // statusSlice: statusSlice.reducer,

    statistics: statusSlice.reducer,
    oneproduct: oneProductSlice.reducer,
    review: reviewSlice.reducer,
  },
});
