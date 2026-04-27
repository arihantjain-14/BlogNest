import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userdata : null
}
//Redux is not doing authentication — it’s managing state.
const slice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state,action) =>{
            state.status =  true;
            state.userdata = action.payload;
        },
        logout : (state) =>{
            state.status = false;
            state.userdata = null;
        }
    }
})

export default slice.reducer;
export const {login,logout} = slice.actions;