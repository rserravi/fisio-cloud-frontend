import axios from "axios";
import i18next from 'i18next';

const rootUrl = "http://localhost:3001/v1";
const calendarUrl = rootUrl + "/calendar";
const bellAlertsUrl = calendarUrl + "/alerts"



//MODE: "pastdate","notanswered","allcal","pastcomm","nextcomm","allcomm","seeall"
export const GetCalendar = (mode, userId)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(calendarUrl, {
                headers: {
                    Authorization :accessJWT,
                },
                params:{
                    "userId": userId,
                    "mode":mode
                }
                
            });
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
    
}

export const GetBellAlerts = (userId)=>{
    return new Promise( async(resolve, reject)=>{
      try {
          const accessJWT = sessionStorage.getItem("accessJWT");
          if (!accessJWT){
              reject("Token not found!");
          }
          
          const res = await axios.get(bellAlertsUrl, {
              headers: {
                  Authorization :accessJWT,
              },
              params:{
                  "userId": userId,
              }
              
          });

          resolve(res.data);
          
      } catch (error) {
          console.log(error);
          reject(error.message);
      }
  })

}

export const AdaptBadgeAlerts = (data) =>{
  
  var jsonObj = []
  if (data){
    var idCounter=0;
    var item = {}
    for (let key in data){
      item = {};
      idCounter= idCounter +1;
      item["id"]= idCounter;
      item["date"] = data[key].start
      item["link"] = data[key].kind==="appo"? "/customer/"+ data[key].customerId +"/appo":"/customer/"+ data[key].customerId +"/comm";
      if (data[key].kind === "appo" && data[key].ispast){
        item["title"] = i18next.t("pastdate") +" "+ data[key].customerName
      }
      if (data[key].kind === "appo" && data[key].isnext){
        item["title"] = i18next.t("nextdate") +" "+ data[key].customerName
      }
      if (data[key].kind === "comm" && !data[key].readed){
        item["title"] = i18next.t("notreaded") +" "+ data[key].customerName
      }
      if (data[key].kind === "comm" && !data[key].answered){
        item["title"] = i18next.t("notanswered") +" "+ data[key].customerName
      }
      if (item["title"]===""){item["title"]="PROBLEMA EN TITULO"}
      jsonObj.push(item) 
    }
    return jsonObj;
  }
  else return []
}