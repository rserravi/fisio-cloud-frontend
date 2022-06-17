import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./pages/dashboard/navigation-slice";
 
const store = configureStore({
   reducer: {
        navigator: navigationReducer,
   }
})
 
export default store;