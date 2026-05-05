import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
}
const feedSlice = createSlice({
    name: "feedUsers",
    initialState,
    reducers: {
        addFeed: (state, action) => {
            state.users = action.payload
        },
        removeFeedUser: (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload)
        },
        emptyFeed: (state) => {
            state.users = []
        }
    }

})

export const { addFeed, removeFeedUser, emptyFeed } = feedSlice.actions
export default feedSlice.reducer;