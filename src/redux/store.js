/* eslint-disable import/no-named-as-default */
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
import notificationSlice from './features/slices/notifications';
import reviewSlice from './features/slices/productReview';
import viewWishlistSlice from './features/slices/wishlistslice';
import clearWishlistSlice from './features/slices/clearwishlist';
import addToWishlistSlice from './features/slices/addWishlistslice';
import DeleteToWishlistSlice from './features/slices/deleteWishlistslice';
import deleteItemSlice from './features/slices/deleteItem';
import availablitySlice from './features/slices/changeAvailability';
import ClearCartReducer from './features/slices/clearCart';
import cartReducer from './features/slices/cart';
import addToCartReducer from './features/slices/addToCartReducer';
import removeToCartReducer from './features/slices/removeToCart';
import updateProfile from './features/slices/updateProfile';
import { orderSlice } from './features/slices/orders';
import logsSlice from './features/slices/logsSlice';
import addReviewSlice from './features/slices/addReview';
import deleteReviewSlice from './features/slices/deleteReview';
import editReviewSlice from './features/slices/editReview';
import subscribersSlice from './features/slices/subscribers';
import chatReducer from './features/slices/getMessage';
import addMessageReducer from './features/slices/addMessage';
import updatesellerStatusSlice from './features/slices/updateSellerCollectionStatus';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    user: userReducer,
    boolean: booleanReducer,
    login: loginReducer,
    updateProfile: updateProfile.reducer,
    signup: signupReducer,
    logout: logoutReducer,
    password: passwordReducer,
    products: productSlice.reducer,
    notifications: notificationSlice,
    categories: categoriesReducer,
    addedItem: addItemReducer,
    collection: collectionSlice.reducer,
    oneproduct: oneProductSlice.reducer,
    reviews: reviewSlice.reducer,
    search: searchReducer,
    deleteItem: deleteItemSlice.reducer,
    availablity: availablitySlice.reducer,
    cart: cartReducer,
    addToCart: addToCartReducer,
    clearCart: ClearCartReducer,
    removeToCart: removeToCartReducer,
    orders: orderSlice.reducer,
    wishlist: viewWishlistSlice.reducer,
    clearWishlist: clearWishlistSlice.reducer,
    subscribers: subscribersSlice.reducer,
    addWishlist: addToWishlistSlice,
    deleteTowishlist: DeleteToWishlistSlice,
    logs: logsSlice,
    deleteReview: deleteReviewSlice,
    editReview: editReviewSlice.reducer,
    addReview: addReviewSlice,
    chat: chatReducer,
    addMessage: addMessageReducer,
    updateSellerStatus: updatesellerStatusSlice,
  },
});
