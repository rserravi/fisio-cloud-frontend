import { userCreate, userUpdate } from "./user.api";

export const createNewUser = (frmData) => async (dispatch) => {
        try {
            // call api
            const result = await userCreate(frmData);
            if(result.status === "error"){return console.log(result.message)};
            return result.message

        } catch (error) {
            console.log(error);
        }
    }

export const updateUser = (_id, frmData) => async (dispatch)=>{
    console.log("fmrdata EN UPDATEUSER", frmData)
    try {
        // call api
        const result = await userUpdate(_id, frmData);
        if(result.status === "error"){return console.log(result.message)};
        return result.message

    } catch (error) {
        console.log(error);
    } 
}