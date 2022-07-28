import axios from "axios";

const rootUrl = "http://localhost:3001/v1";
const historyUrl = rootUrl + "/history";

export const getCabinIdInHistory=(cabin)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(historyUrl, {
                data:{
                    "cabin":cabin
                }
            });
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const getHistoriesByCustomerId = (customerId)=>{
    console.log("CUSTOMER ID EN GETHITORIES",customerId)
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(historyUrl, {
                params:{
                    "customerId":customerId
                }
            });
            console.log(res.data.result);
            resolve(res.data.result);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}