import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSubmited:false,
    isValidated: false,
    error: "",
    isEditing:false,
    isNew: true,
    id:0,
    addedAt:"",
    firstname:"",
    lastname:"",
    image: "images/Portrait_Placeholder.png",
    dni: "",
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
    releaseformFile:"",
    releaseformGenerated:false,
    releaseformSigned:false,
    locale:"es-ES",
    role:"user"
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
        },
        nc_isNewCommit:(state, action)=>{
            state.isNew = action.payload;
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
        },
        nc_locale_Commit:(state, action) =>{
            state.locale = action.payload;
        },
        nc_role_Commit:(state, action) =>{
            state.role = action.payload; 
        },
        nc_dni_Commit:(state, action) =>{
            state.dni = action.payload; 
        },
        nc_releaseformFile:(state, action)=>{
            state.releaseformFile = action.payload;
        },
        nc_releaseformGenerated:(state, action)=>{
            state.releaseformGenerated = action.payload;
        },
        nc_releaseformSigned:(state, action)=>{
            state.releaseformSigned = action.payload;
        },
        
        nc_loadFromBackend:(state, action)=>{
            state.isSubmited=false
            state.isValidated=false
            state.error=false
            state.isEditing=action.payload.isEditing
            state.id = action.payload.id
            state.addedAt = action.payload.addedAt
            state.firstname=action.payload.firstname
            state.lastname=action.payload.lastname
            state.image=action.payload.image
            state.birthdate=action.payload.birthdate
            state.gender=action.payload.gender
            state.dni = action.payload.dni
            state.emailhome=action.payload.emailhome
            state.emailwork=action.payload.emailwork
            state.streetaddress=action.payload.streetaddress
            state.city=action.payload.cityaddress
            state.state=action.payload.stateaddress
            state.postalCode=action.payload.postalcodeaddress
            state.country=action.payload.countryaddress
            state.homephone=action.payload.phonehome
            state.mobilephone=action.payload.phonework
            state.whatsapp=action.payload.whatsapp
            state.social1=action.payload.socialmedia1
            state.socialUser1=action.payload.socialuser1
            state.social2=action.payload.socialmedia2
            state.socialUser2=action.payload.socialuser2
            state.social3=action.payload.socialmedia3
            state.socialUser3=action.payload.socialuser3        
            state.countryPhoneCode=action.payload.countryPhoneCode
            
            if(action.payload.releaseForm){
                state.releaseformFile=action.payload.releaseForm.file
                state.releaseformGenerated=action.payload.releaseForm.generated
                state.releaseformSigned=action.payload.releaseForm.signed
            }
            state.locale=action.payload.locales
            state.role=action.payload.role
            state.isNew=action.payload.isNew
        },
        nc_reset_slice:()=>initialState
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
    nc_dni_Commit,
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
    nc_countryPhoneCode_Commit,
    nc_locale_Commit,
    nc_role_Commit,
    nc_releaseformFile,
    nc_releaseformGenerated,
    nc_releaseformSigned,
    nc_loadFromBackend,
    nc_reset_slice,
    nc_isNewCommit
    } = actions;
export default reducer;