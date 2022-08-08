import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screen :"/dashboard",
    previousScreen:"",
    drawerOpen: true,
    showMenu: true,
    customerOpen: false,
    appointmentsOpen: false,
    communicationsOpen: false,
    isLoading: false,
    error: ""
}

const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers:{
        navigationLoading:(state, action)=>{
           
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
        },
        navigationCommunicationsPanel:(state, action) =>{
            state.communicationsOpen = action.payload;
        },
        navigationMenu:(state, action) =>{
            state.showMenu = action.payload;
        },
        navigationForceActualScreen:(state, action) =>{
            state.screen = action.payload
        },
    }
});

const {reducer, actions} = navigationSlice;
export const {
    navigationLoading, 
    navigationSuccess, 
    navigationFail, 
    navigationClientPanel, 
    navigationAppointmentPanel, 
    navigationDrawer,
    navigationCommunicationsPanel,
    navigationMenu,
    navigationForceActualScreen
} = actions;
export default reducer;