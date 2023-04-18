import { configureStore } from '@reduxjs/toolkit'
import booleanReducer from './features/slices/sample'

export const store = configureStore({
  reducer: {
    boolean: booleanReducer
  },
})
