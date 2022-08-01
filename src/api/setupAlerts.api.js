import { queries } from "@testing-library/react";
import axios from "axios";

const rootUrl = "http://localhost:3001/v1";
const setupAlerts = rootUrl + "/setupalerts";

export const GetAlertsData= (userId) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(setupAlerts, {
                headers: {
                    Authorization :accessJWT,
                },
                queries:{
                    "userId": userId
                }
            });
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const UpdateAlertsData= (alerts) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.put(setupAlerts, {
                headers: {
                    Authorization :accessJWT,
                },
                alerts
            });
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}
