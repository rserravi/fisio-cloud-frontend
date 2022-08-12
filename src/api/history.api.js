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

export const getHistoryById = (histoId)=>{
   // console.log("HISTO EN getHistoryById", histoId)
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(historyUrl, {
                params:{
                    "_id": histoId
                }
            });
            //console.log("GET HISTORYBYID RESULT",res.data.result);
            resolve(res.data.result[0]);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const updateHistory= (frmData)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.put(historyUrl, {
                body:frmData
            })
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}
