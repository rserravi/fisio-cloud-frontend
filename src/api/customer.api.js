import axios from "axios";

const rootUrl = "http://localhost:3001/v1";
const customerUrl = rootUrl + "/customer";

export const addCustomer = (frmData) =>{
    console.log("frmdata en ADD CUSTOMER", frmData)
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(customerUrl, frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const getAllCustomers= ()=>{

    return new Promise( async(resolve, reject)=>{
        try {

            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(customerUrl, {
                headers: {
                    Authorization :accessJWT,
                }
            });
            console.log("RESPUESTA DE GET ALL CUSTOMERS",res.data)
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}
