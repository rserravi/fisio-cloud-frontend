import axios from "axios";

const rootUrl = "http://localhost:3001/v1";
const servicesUrl = rootUrl + "/services";

export const getServices= () =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(servicesUrl, {
                headers: {
                    Authorization :accessJWT,
                }
            });
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const addServices = (frmData) =>{
    console.log("frmdata en ADD SERVICES", frmData)
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(servicesUrl, frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const deleteServices = (_id) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.delete(servicesUrl, 
                { data:{
                    _id:_id
                }
            });
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const getServiceNameById=(_id)=>{
    const url = servicesUrl+"/"+_id;
    return new Promise( async(resolve, reject)=>{
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(url, {
                headers: {
                    Authorization :accessJWT,
                }
            });
            console.log("GET SERVICE BY ID", res.data.result.serviceName)
            resolve(res.data.result.serviceName);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}
