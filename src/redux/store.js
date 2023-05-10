/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { configureStore } from '@reduxjs/toolkit';
import booleanReducer from './features/slices/sample';
import loginReducer from './features/slices/login';
import userReducer from './features/slices/user';
import signupReducer from './features/slices/signup';
import logoutReducer from './features/slices/logout';
import passwordReducer from './features/slices/password';
import productSlice from './features/slices/products';
import categoriesReducer from './features/slices/categories';
import addItemReducer from './features/slices/additem';
import productReducer from './features/slices/productslice';
import searchReducer from './features/slices/searchslice';

import collectionSlice from './features/slices/sellerCollection';

import updatesellerStatusReducer from './features/slices/updateSellerCollectionStatus';

import oneProductSlice from './features/slices/oneProduct';
import statusSlice from './features/slices/sellerStatus';
import reviewSlice from './features/slices/productReview';
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
    statistics: statusSlice.reducer,
    oneproduct: oneProductSlice.reducer,
    review: reviewSlice.reducer,
    product: productReducer,
    search: searchReducer,
    updatesellerStatus: updatesellerStatusReducer,
  },
});
