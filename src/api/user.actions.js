import { userCreate } from "./user.api";

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