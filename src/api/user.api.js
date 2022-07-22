
import axios from "axios";

const rootUrl = "http://localhost:3001/v1";
const loginUrl = rootUrl + "/user/login";
const userUrl = rootUrl + "/user"

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

export const fetchUser = () =>{
    return new Promise( async(resolve, reject)=>{
        try {

            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            console.log("JWT",accessJWT)
            const res = await axios.get(userUrl, {
                headers: {
                    Authorization :accessJWT,
                }
            });
            console.log("DATOS DESPUES DE AXIOS", res.data)
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}