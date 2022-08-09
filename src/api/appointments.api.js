import axios from "axios";

const rootUrl = "http://localhost:3001/v1";
const appoUrl = rootUrl + "/appo";

export const addAppointment = (frmData) =>{
    console.log("frmdata en ADD APPO", frmData)
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(appoUrl, frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const getAllAppointments= (userId)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(appoUrl, {
                params:{
                    "userId":userId
                }
            })
            resolve(res.data.result);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const getAppointmentById= (appoId)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(appoUrl, {
                params:{
                    _id:appoId
                }
            })
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const updateAppointment = (frmData)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.put(appoUrl, {
                body:frmData
            })
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const deleteAppointment = (_id)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.delete(appoUrl, {
                params:{_id:_id}
            })
            resolve(res.data);
            
        } catch (error) {
            console.log("ERROR EN DELETE APPO",error);
            reject(error.message);
        }
    })
}

export const closeAppointment = (_id)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.delete(appoUrl+"/close", {
                params:{_id:_id}
            })
            resolve(res.data);
            
        } catch (error) {
            console.log("ERROR EN CLOSE APPO",error);
            reject(error.message);
        }
    })
}