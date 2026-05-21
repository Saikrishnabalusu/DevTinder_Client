import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/userReducer'
import feedReducer from "../reducers/feedReducer"
import connectionReducer from '../reducers/connectionsReducer'
import requestReducer from '../reducers/requestReducer'


export const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestReducer
    }
})