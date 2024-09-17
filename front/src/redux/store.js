// configuration de store
import { configureStore } from "@reduxjs/toolkit"
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
    }
})