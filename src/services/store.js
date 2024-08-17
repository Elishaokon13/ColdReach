import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api';
import userReducer from './redux'

 export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

// store.dispatch()





