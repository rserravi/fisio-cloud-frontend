import axios from "axios";

const rootUrl = "http://localhost:3001/v1";
const appoUrl = rootUrl + "/appo";

export const getAllAppointments= (userId)=>{
    console.log("USERID ID EN GETHITORIES",userId)
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(appoUrl, {
                params:{
                    "userId":userId
                }
            });
            console.log("EN GET ALL APPOINTMENTS",res.data.result);
            resolve(res.data.result);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}