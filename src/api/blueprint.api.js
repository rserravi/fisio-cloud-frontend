import axios from "axios";

const rootUrl = "http://localhost:3001/v1";
const blueprintUrl = rootUrl + "/blueprint";

export const getBlueprintsList= ()=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(blueprintUrl, {
            })
            resolve(res.data.result);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const getBlueprintsByName= (name)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(blueprintUrl, {
                params:{
                    filename:name
                }
            })
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const blueprintUpdate = (name, frmData)=>{
    const nameUrl = blueprintUrl + "/?filename=" + name;
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.patch(nameUrl, {html:frmData});
            console.log("RES en BLUEPRINT UPDATE", res)
            resolve(res.data);
        } catch (error) {
            reject(error);
            console.log("ERROR DE AXIOS", error)
        }
    })
}

