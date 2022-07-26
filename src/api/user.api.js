
import axios from "axios";

const rootUrl = "http://localhost:3001/v1";
const loginUrl = rootUrl + "/user/login";
const userUrl = rootUrl + "/user"
const userListUrl = rootUrl + "/user/list";
const logOutUrl = rootUrl + "/user/logout";
const newAccessJWTurl = rootUrl + "/tokens";

export const userLogin = (frmData) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(loginUrl, frmData);
            if(res.data.status ==="success"){
                sessionStorage.setItem("accessJWT", res.data.accessJWT);
                localStorage.setItem(
                  "fisioCloudSite",
                  JSON.stringify({ refreshJWT: res.data.refreshJWT })
                );
            }
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const userCreate = (frmData) =>{
    console.log("frmdata en USER CREATE", frmData)
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(userUrl, frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const userUpdate = (_id, frmData) =>{
    const idUrl = userUrl + "/" + _id;
    const newData = frmData
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.patch(idUrl, frmData);
            console.log("RES en USERUPDATE", res)
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const getAllUsers= ()=>{

    return new Promise( async(resolve, reject)=>{
        try {

            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(userListUrl, {
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

export const fetchUser = () =>{
    return new Promise( async(resolve, reject)=>{
        try {

            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }

            
            const res = await axios.get(userUrl, {
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

export const userLogout = async() =>{
    try {
        const accessJWT = sessionStorage.getItem("accessJWT");
    if (!accessJWT){
        console.log("Token not found!");
    }
  
    await axios.delete(logOutUrl, {
        headers: {
            Authorization :accessJWT,
        }
    });
    } catch (error) {
        console.log(error);
    }
 }

 export const fetchNewAccessJWT = () =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const {refreshJWT} = JSON.parse(localStorage.getItem("fisioCloudSite"));
            if (!refreshJWT){
                reject("Token not found!");
            }
            const res = await axios.get(newAccessJWTurl, {
                headers: {
                    Authorization :refreshJWT,
                }
            });
            if(res.data.status ==="success"){
                sessionStorage.setItem("accessJWT", res.data.accessJWT);   
            } 
            resolve(true);
            
        } catch (error) {
            if (error.message === "Request failed with status code 403"){
                localStorage.removeItem("fisioCloudSite");
            }
            reject(false);
        }
    })
}

 