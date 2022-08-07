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
        console.log("GET ALL CUSTOMERTS")
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                console.log("TOKEN NOT FOUND");
                reject("Token not found!");
            }
            console.log("Token Found", accessJWT);
            
            await axios.get(customerUrl, {
                headers: {
                    Authorization :accessJWT,
                }
            }).then((data)=>{
                console.log("DATA EN GET CUSTOMERS",data)
                resolve(data.data);
            }).catch((error)=>{
                console.log ("ERROR EN AXIOS", error)
            })
            
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const GetCustomer = (id) =>{
    const url = customerUrl + "/"+id;
    console.log("ID en GETCUSTOMER API", id, "URL:"+url)
    return new Promise( async(resolve, reject)=>{
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(url, {
                headers: {
                    Authorization :accessJWT,
                },
            });
            resolve(res.data);
        } catch (error) {
            console.log("ERROR EN GET CUSTOMER", error, "ID en GETCUSTOMER API", id, "URL:"+url)
            reject(error);
        }
    })
}


// | 5     | '/v1/customer/{_custoId}'        | PUT    | TODO     |Yes         | Update customer data 

export const UpdateCustomer = (id, data) =>{
   
    const url = customerUrl + "/"+id;
    //console.log("ID en UPDATECUSTOMER API", id, "URL:"+url)
    return new Promise( async(resolve, reject)=>{
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.patch(url, {
                headers: {
                    Authorization :accessJWT,
                },
                body: data 
            });
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}
