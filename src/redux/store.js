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
import searchReducer from './features/slices/searchslice';
import collectionSlice from './features/slices/sellerCollection';
import oneProductSlice from './features/slices/oneProduct';
import addReviewSlice from './features/slices/addReview';
import reviewSlice from './features/slices/productReview';
import deleteReviewSlice from './features/slices/deleteReview';
import deleteItemSlice from './features/slices/deleteItem';
import availablitySlice from './features/slices/changeAvailability';
import editReviewSlice from './features/slices/editReview';
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
    addReview: addReviewSlice,
    editReview: editReviewSlice.reducer,
    oneproduct: oneProductSlice.reducer,
    reviews: reviewSlice.reducer,
    search: searchReducer,
    deleteReview: deleteReviewSlice,
    deleteItem: deleteItemSlice.reducer,
    availablity: availablitySlice.reducer,
  },
});
