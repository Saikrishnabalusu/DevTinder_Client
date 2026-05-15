import { createSlice } from "@reduxjs/toolkit";

const connectionReducer = createSlice({
    name: "connections",
    initialState: {
        connections: []
    },
    reducers: {
        setConnections: (state, action) => {
            state.connections = action.payload;
        }
    }
})

export const { setConnections } = connectionReducer.actions;
export default connectionReducer.reducer;




