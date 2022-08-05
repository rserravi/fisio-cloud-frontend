import axios from "axios";
import i18next from 'i18next';

const rootUrl = "http://localhost:3001/v1";
const reportsUrl = rootUrl + "/reports";
const deposits = reportsUrl + "/depositsforchart";

export const GetReports= (locales) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(reportsUrl, {
                headers: {
                    Authorization :accessJWT,
                },
                params: {
                    locale: locales
                }
            });
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}