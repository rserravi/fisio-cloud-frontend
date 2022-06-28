import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigation-slice";
import newCustomerReducer  from "./slices/newCustomer-slice";
 
const store = configureStore({
   reducer: {
        navigator: navigationReducer,
        newCustomer: newCustomerReducer,
   }
})
 
export default store;