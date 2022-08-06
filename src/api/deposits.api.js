import axios from "axios";

const rootUrl = "http://localhost:3001/v1";
const depositsUrl = rootUrl + "/deposits";

export const getDeposits=(from, end, userId)=>{
    const fromDate = new Date(from);
    const fromDateText = fromDate.getUTCFullYear() + "-" + Number(Number(fromDate.getUTCMonth()) +1) + "-" + fromDate.getUTCDay()
    const endDate = new Date(end);
    const endDateText = endDate.getUTCFullYear() + "-" +  Number(Number(endDate.getUTCMonth()) +1) + "-" + endDate.getUTCDay()
    
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(depositsUrl, {
                params:{
                    "from": fromDateText,
                    "end": endDateText,
                    "userId":userId
                }
            });
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

