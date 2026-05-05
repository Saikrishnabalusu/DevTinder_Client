import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/userReducer'
import feedReducer from "../reducers/feedReducer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer
    }
})