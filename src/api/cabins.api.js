import axios from "axios";

const rootUrl = "http://localhost:3001/v1";
const cabinsUrl = rootUrl + "/cabins";

export const getCabins= () =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(cabinsUrl, {
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

export const addCabins = (frmData) =>{
    console.log("frmdata en ADD CABINS", frmData)
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(cabinsUrl,frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const deleteCabins = (_id) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.delete(cabinsUrl, 
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