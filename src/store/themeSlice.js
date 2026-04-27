import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeMode : "dark"
}

const slice = createSlice({
    name : "theme",
    initialState,
    reducers : {
        lightMode(state,action){
            state.themeMode = "light"
        },
        darkMode(state,action){
            state.themeMode = "dark"
        }
    }
})

export default slice.reducer;
export const {lightMode,darkMode} = slice.actions;