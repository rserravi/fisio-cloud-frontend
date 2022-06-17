import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screen :"mainDashboard",
    customerOpen: false,
    appointmentsOpen: false,
    isLoading: false,
    error: ""
}

const navigationSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers:{
        navigationLoading:(state)=>{
            state.isLoading = true;
        },
        navigationSuccess:(state, action)=>{
            state.screen = action.payload;
            state.isLoading = false;
        },
        navigationFail:(state, {payload})=>{
            state.error = payload;
            state.isLoading = false;
        },
        navigationClientPanel:(state, action)=>{
            state.customerOpen = action.payload;
        },
        navigationAppointmentPanel:(state, action)=>{
            state.appointmentsOpen = action.payload;
        }
    }
});

const {reducer, actions} = navigationSlice;
export const {navigationLoading, navigationSuccess, navigationFail, navigationClientPanel, navigationAppointmentPanel} = actions;
export default reducer;