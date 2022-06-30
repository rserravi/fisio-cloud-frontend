import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screen :"Dashboard",
    previousScreen:"",
    drawerOpen: true,
    customerOpen: false,
    appointmentsOpen: false,
    isLoading: false,
    error: ""
}

const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers:{
        navigationLoading:(state)=>{
            state.isLoading = true;
        },
        navigationSuccess:(state, action)=>{
            state.previousScreen = state.screen;
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
        },
        navigationDrawer:(state, action) =>{
            state.drawerOpen = action.payload;
        }
        
    }
});

const {reducer, actions} = navigationSlice;
export const {navigationLoading, navigationSuccess, navigationFail, navigationClientPanel, navigationAppointmentPanel, navigationDrawer} = actions;
export default reducer;