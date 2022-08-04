import { createSlice } from "@reduxjs/toolkit";
import i18n from 'i18next';
import { getUserDataFromDb } from "../utils/dataFetch-utils";

const localeFromNav = navigator.language

const initialState = {
    isSubmited:false,
    isValidated: false,
    isLoading:false,
    error: "",
    isEditing:false,
    isNew: true,
    id:"",
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
    locale:localeFromNav,
    role:"user",
    lastConnect:"",
    password:"",
    refreshJWT:{}
}

const createCustomerSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        user_editingStart:(state)=>{
            state.isEditing = true;
        },
        user_submittedFailed:(state, {payload})=>{
            state.error = payload;
            state.isEditing = false;
            state.isSubmited = false;
        },
        user_submmitedSucceed:(state)=>{
            state = initialState;
            state.isSubmited = true;
        },
        user_isNewCommit:(state, action)=>{
            state.isNew = action.payload;
        },
        user_isValidated:(state)=>{
            state.isValidated = true;
        },
        user_id_Commit:(state)=>{
            state.isValidated = true;
        },
        user_firstName_Commit:(state, action)=>{
            state.firstname = action.payload;
        },
        user_lastName_Commit:(state, action)=>{
            state.lastname = action.payload;
        },
        user_image_Commit:(state, action)=>{
            state.image = action.payload;
        },
        user_birthdate_Commit:(state, action)=>{
            state.birthdate = action.payload;
        },
        user_gender_Commit:(state, action)=>{
            state.gender = action.payload;
        },
        user_emailHome_Commit:(state, action)=>{
            state.emailhome = action.payload;
        },
        user_emailWork_Commit:(state, action)=>{
            state.emailwork = action.payload;
        },
        user_streetaddress_Commit:(state, action)=>{
            state.streetaddress = action.payload;
        },
        user_city_Commit:(state, action)=>{
            state.city = action.payload;
        },
        user_state_Commit:(state, action)=>{
            state.state = action.payload;
        },
        user_postalCode_Commit:(state, action)=>{
            state.postalCode = action.payload;
        },
        user_country_Commit:(state, action)=>{
            state.country = action.payload;
        },
        user_homephone_Commit:(state, action)=>{
            state.homephone = action.payload;
        },
        user_mobilephone_Commit:(state, action)=>{
            state.mobilephone = action.payload;
        },
        user_whatsapp_Commit:(state, action)=>{
            state.whatsapp = action.payload;
        },
        user_social1_Commit:(state, action)=>{
            state.social1 = action.payload;
        },
        user_social2_Commit:(state, action)=>{
            state.social2 = action.payload;
        },
        user_social3_Commit:(state, action)=>{
            state.social3 = action.payload;
        },
        user_socialUser1_Commit:(state, action)=>{
            state.socialUser1 = action.payload;
        },
        user_socialUser2_Commit:(state, action)=>{
            state.socialUser2 = action.payload;
        },
        user_socialUser3_Commit:(state, action)=>{
            state.socialUser3 = action.payload;
        },
        user_countryPhoneCode_Commit:(state, action)=>{
            state.countryPhoneCode = action.payload;
        },
        user_locale_Commit:(state, action) =>{
            state.locale = action.payload;
        },
        user_role_Commit:(state, action) =>{
            state.role = action.payload; 
        },
        user_dni_Commit:(state, action) =>{
            state.dni = action.payload; 
        },
        user_set_locale: (state)=>{

            if(!i18n.isInitialized){
            i18n.init({
                lng:state.locale,
                fallbackLng: 'es-ES',
                debug: true,
            
                interpolation: {
                  escapeValue: false, // not needed for react as it escapes by default
                }
              });
            }else{
                if (i18n.language!==state.locale){
                    i18n.changeLanguage(state.locale);
                }
            }
        },
       
        user_loadFromBackend:(state, action)=>{
            console.log("DATA EN LOAD FROM BACKEND", action.payload)
            state.id = action.payload.id
            state.isSubmited=action.payload.isSubmited
            state.isValidated=action.payload.isValidated
            state.error=action.payload.error
            state.isEditing=action.payload.isEditing
            state.firstname=action.payload.firstname
            state.lastname=action.payload.lastname
            state.image=action.payload.image
            state.birthdate=action.payload.birthdate
            state.gender=action.payload.gender
            state.emailhome=action.payload.emailhome
            state.emailwork=action.payload.emailwork
            state.streetaddress=action.payload.streetaddress
            state.city=action.payload.city
            state.state=action.payload.state
            state.postalCode=action.payload.postalCode
            state.country=action.payload.country
            state.homephone=action.payload.homephone
            state.mobilephone=action.payload.mobilephone
            state.whatsapp=action.payload.whatsapp
            state.social1=action.payload.social1
            state.social2=action.payload.social2
            state.social3=action.payload.social3
            state.socialUser1=action.payload.socialUser1
            state.socialUser2=action.payload.socialUser2
            state.socialUser3=action.payload.socialUser3
            state.countryPhoneCode=action.payload.countryPhoneCode
            state.locale=action.payload.locale
            state.role=action.payload.role
            state.isNew=action.payload.isNew
            state.lastConnect = action.payload.lastConect
        },


        user_loadFromApi:(state, action)=>{
            state.id = action.payload._id
            state.isSubmited=false
            state.isValidated=false
            state.error=action.payload.error
            state.isEditing=false
            state.firstname=action.payload.firstname
            state.lastname=action.payload.lastname
            state.image=action.payload.image
            state.birthdate=action.payload.birthdate
            state.dni = action.payload.dni
            state.gender=action.payload.gender
            state.emailhome=action.payload.emailhome
            state.emailwork=action.payload.emailwork
            state.streetaddress=action.payload.streetaddress
            state.city=action.payload.cityaddress
            state.state=action.payload.state
            state.postalCode=action.payload.postalcodeaddress
            state.country=action.payload.countryaddress
            state.homephone=action.payload.homephone
            state.mobilephone=action.payload.mobilephone
            state.whatsapp=action.payload.whatsapp
            state.social1=action.payload.socialmedia1
            state.social2=action.payload.socialmedia2
            state.social3=action.payload.socialmedia3
            state.socialUser1=action.payload.socialuser1
            state.socialUser2=action.payload.socialuser2
            state.socialUser3=action.payload.socialuser3
            state.countryPhoneCode=""
            state.locale=action.payload.locales
            state.role=action.payload.role
            state.isNew=false
            state.lastConnect = action.payload.lastConect
            state.password = action.payload.password
            state.refreshJWT = action.payload.refreshJWT
        },

        user_set_user: (state, action) =>{
            const userData = getUserDataFromDb(action.payload)
            //console.log("USER DATA",userData, "PAYLOAD", action.payload);
            state.id = userData.id;
            state.isSubmited=userData.isSubmited
            state.isValidated=userData.isValidated
            state.error=userData.error
            state.isEditing=userData.isEditing
            state.firstname=userData.firstname
            state.lastname=userData.lastname
            state.image=userData.image
            state.birthdate=userData.birthdate
            state.gender=userData.gender
            state.emailhome=userData.emailhome
            state.emailwork=userData.emailwork
            state.streetaddress=userData.streetaddress
            state.city=userData.city
            state.state=userData.state
            state.postalCode=userData.postalCode
            state.country=userData.country
            state.homephone=userData.homephone
            state.mobilephone=userData.mobilephone
            state.whatsapp=userData.whatsapp
            state.social1=userData.social1
            state.social2=userData.social2
            state.social3=action.payload.social3
            state.socialUser1=userData.socialUser1
            state.socialUser2=userData.socialUser2
            state.socialUser3=userData.socialUser3
            state.countryPhoneCode=userData.countryPhoneCode
            state.locale=userData.locale
            state.role=userData.role
            state.isNew=userData.isNew
            state.lastConnect = userData.lastConect
        },
        
        user_reset_slice:()=>initialState,
        getUserPending: (state)=>{
            state.isLoading = true;
        },
        getUserSuccess: (state, {payload})=>{
            state.isloading = false
            state.user = payload
            state.error = ""
        },
        getUserFail: (state, {payload})=>{
            state.isloading = false;
            state.error = payload;
        }, 
    }
});

const {reducer, actions} = createCustomerSlice;
export const {
    getUserPending,
    getUserSuccess,
    getUserFail,
    user_editingStart,
    user_submittedFailed,
    user_submmitedSucceed,
    user_isValidated,
    user_id_Commit,
    user_firstName_Commit,
    user_lastName_Commit,
    user_dni_Commit,
    user_image_Commit,
    user_birthdate_Commit,
    user_gender_Commit,
    user_emailHome_Commit,
    user_emailWork_Commit,
    user_streetaddress_Commit,
    user_city_Commit,
    user_state_Commit,
    user_postalCode_Commit,
    user_country_Commit,
    user_mobilephone_Commit,
    user_homephone_Commit,
    user_whatsapp_Commit,
    user_social1_Commit,
    user_social2_Commit,
    user_social3_Commit,
    user_socialUser1_Commit,
    user_socialUser2_Commit,
    user_socialUser3_Commit,
    user_countryPhoneCode_Commit,
    user_locale_Commit,
    user_role_Commit,
    user_loadFromBackend,
    user_loadFromApi,
    user_reset_slice,
    user_isNewCommit,
    user_set_locale,
    user_set_user,
    } = actions;
export default reducer;