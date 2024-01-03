import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/slice.js"


export const store = configureStore({
  reducer: {user :userReducer},
})