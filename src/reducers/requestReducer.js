import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
    name: 'requests',
    initialState: {
        pendingRequests: []
    },
    reducers: {
        setPendingRequests: (state, action) => {
            state.pendingRequests = action.payload;
        },
        removePendingRequest: (state, action) => {
            state.pendingRequests = state.pendingRequests.filter(request => request._id !== action.payload);
        }
    }
});

export const { setPendingRequests, removePendingRequest } = RequestSlice.actions;
export default RequestSlice.reducer;