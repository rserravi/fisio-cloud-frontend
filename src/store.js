import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigation-slice";
import newCustomerReducer  from "./slices/newCustomer-slice";
import userReducer from "./slices/user-slice";
 
const store = configureStore({
   reducer: {
        navigator: navigationReducer,
        newCustomer: newCustomerReducer,
        user: userReducer,
   }
})
 
export default store;