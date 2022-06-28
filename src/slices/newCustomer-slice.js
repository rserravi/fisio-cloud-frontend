import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSubmited:false,
    isValidated: false,
    error: "",
    isEditing:false,
    firstname:"",
    lastname:"",
    image: "images/Portrait_Placeholder.png",
    birthdate: "",
    gender:"none",
    emailhome:"",
    emailwork:"",
    streetaddress: "",
    city:"",
    state:"",
    postalCode:"",
    country:"Spain",
    homephone:"",
    mobilephone:"+34",
    whatsapp:"+34",
    social1: "Facebook",
    social2: "Twitter",
    social3: "Instagram",
    socialUser1:"@",
    socialUser2:"@",
    socialUser3:"@",
    countryPhoneCode:"+34",
}

const createCustomerSlice = createSlice({
    name: "newCustomer",
    initialState,
    reducers:{
        nc_editingStart:(state)=>{
            state.isEditing = true;
        },
        nc_submittedFailed:(state, {payload})=>{
            state.error = payload;
            state.isEditing = false;
            state.isSubmited = false;
        },
        nc_submmitedSucceed:(state)=>{
            state = initialState;
            state.isSubmited = true;
        },
        nc_isValidated:(state)=>{
            state.isValidated = true;
        },
        nc_firstName_Commit:(state, action)=>{
            state.firstname = action.payload;
        },
        nc_lastName_Commit:(state, action)=>{
            state.lastname = action.payload;
        },
        nc_image_Commit:(state, action)=>{
            state.image = action.payload;
        },
        nc_birthdate_Commit:(state, action)=>{
            state.birthdate = action.payload;
        },
        nc_gender_Commit:(state, action)=>{
            state.gender = action.payload;
        },
        nc_emailHome_Commit:(state, action)=>{
            state.emailhome = action.payload;
        },
        nc_emailWork_Commit:(state, action)=>{
            state.emailwork = action.payload;
        },
        nc_streetaddress_Commit:(state, action)=>{
            state.streetaddress = action.payload;
        },
        nc_city_Commit:(state, action)=>{
            state.city = action.payload;
        },
        nc_state_Commit:(state, action)=>{
            state.state = action.payload;
        },
        nc_postalCode_Commit:(state, action)=>{
            state.postalCode = action.payload;
        },
        nc_country_Commit:(state, action)=>{
            state.country = action.payload;
        },
        nc_homephone_Commit:(state, action)=>{
            state.homephone = action.payload;
        },
        nc_mobilephone_Commit:(state, action)=>{
            state.mobilephone = action.payload;
        },
        nc_whatsapp_Commit:(state, action)=>{
            state.whatsapp = action.payload;
        },
        nc_social1_Commit:(state, action)=>{
            state.social1 = action.payload;
        },
        nc_social2_Commit:(state, action)=>{
            state.social2 = action.payload;
        },
        nc_social3_Commit:(state, action)=>{
            state.social3 = action.payload;
        },
        nc_socialUser1_Commit:(state, action)=>{
            state.socialUser1 = action.payload;
        },
        nc_socialUser2_Commit:(state, action)=>{
            state.socialUser2 = action.payload;
        },
        nc_socialUser3_Commit:(state, action)=>{
            state.socialUser3 = action.payload;
        },
        nc_countryPhoneCode_Commit:(state, action)=>{
            state.countryPhoneCode = action.payload;
        }
    }
});

const {reducer, actions} = createCustomerSlice;
export const {
    nc_editingStart,
    nc_submittedFailed,
    nc_submmitedSucceed,
    nc_isValidated,
    nc_firstName_Commit,
    nc_lastName_Commit,
    nc_image_Commit,
    nc_birthdate_Commit,
    nc_gender_Commit,
    nc_emailHome_Commit,
    nc_emailWork_Commit,
    nc_streetaddress_Commit,
    nc_city_Commit,
    nc_state_Commit,
    nc_postalCode_Commit,
    nc_country_Commit,
    nc_mobilephone_Commit,
    nc_homephone_Commit,
    nc_whatsapp_Commit,
    nc_social1_Commit,
    nc_social2_Commit,
    nc_social3_Commit,
    nc_socialUser1_Commit,
    nc_socialUser2_Commit,
    nc_socialUser3_Commit,
    nc_countryPhoneCode_Commit
    } = actions;
export default reducer;