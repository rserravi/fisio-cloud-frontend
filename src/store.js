import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigation-slice";
import newCustomerReducer  from "./slices/newCustomer-slice";
import userReducer from "./slices/user-slice";
import loginReducer from  "./slices/login-slice"

 
const store = configureStore({
   reducer: {
        navigator: navigationReducer,
        newCustomer: newCustomerReducer,
        user: userReducer,
        login: loginReducer,
   }
})
 
export default store;