import axios from "axios";

const rootUrl = "http://localhost:3001/v1";
const commUrl = rootUrl + "/comm";
const threadUrl = commUrl + "/thread";

export const GetThread = (threadNumber)=>{
    console.log ("ESTAMOS EN GETHTREAD", threadNumber)
    return new Promise( async(resolve, reject)=>{
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(threadUrl, {
                headers: {
                    Authorization :accessJWT,
                },
                params:{
                    "threadNumber":threadNumber
                }
                
            });
            console.log("DATA EN GETTHREAD", res.data)
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const GetThreadByCommId = (commId)=>{
    console.log ("ESTAMOS EN GETHTREADBYCOMMID", commId)
    return new Promise( async(resolve, reject)=>{
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(threadUrl, {
                headers: {
                    Authorization :accessJWT,
                },
                params:{
                    "commId":commId
                }
                
            });
            console.log("DATA EN GETTHREAD", res.data)
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const GetAllComm = ()=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(commUrl, {
                headers: {
                    Authorization :accessJWT,
                }           
            });
            //console.log("DATA EN ALLCOMM", res.data)
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}