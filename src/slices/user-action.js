import { getUserPending, getUserSuccess, getUserFail, user_loadFromApi, user_set_locale } from "./user-slice";
import { fetchUser } from "../api/user.api"
 
export const getUserProfile = () => async(dispatch) =>{
    try {
        dispatch(getUserPending());
        const result = await fetchUser();
        
        if (result.user && result.user._id){
            dispatch(user_loadFromApi(result.user))
            dispatch(user_set_locale())
            return dispatch(getUserSuccess(result.user));
        }

        dispatch(getUserFail("User not found!"));
    } catch (error) {
        dispatch(getUserFail(error))
    }
}

