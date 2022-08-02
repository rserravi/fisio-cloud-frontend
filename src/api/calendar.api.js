import axios from "axios";
const rootUrl = "http://localhost:3001/v1";
const calendarUrl = rootUrl + "/calendar";


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

/* export const GetAlertsCalendarFormat = (mode)=>{
    // const { t } = useTranslation();
     var jsonObj = [];
     var newIdCount =0;
     for (let userKey in customerData){
         if(customerData[userKey].contacthistory.length >0){
             for (let commKey in customerData[userKey].contacthistory){
               if( customerData[userKey].contacthistory[commKey].follow && customerData[userKey].contacthistory[commKey].alertfollow)
               {
                 var backgroundColor = "mediumturquoise";
                 var color = "black";
                 const start = new Date(customerData[userKey].contacthistory[commKey].alertfollow)
                 const end = addMinutesToDate(start, 30);
                 var timeDif = Math.ceil(timeDifference(start) /(1000 * 3600 * 24)); //CONVERT TIMEDIFFERENCE TO DAYS
                 var isPast = false;
                 var isNext = false;
                 if (timeDif <= 0){
                   backgroundColor = "firebrick";
                   color = "white"
                   isPast = true;
                 }
                 if (timeDif <=7 && timeDif >=0){
                   backgroundColor = "tan";
                   color = "white"
                   isNext = true;
                 }
   
                 // CONDICIONAL
                 if (!mode || (mode==="past" && isPast) || (mode==="next" && isNext)){
                
                   newIdCount = newIdCount +1;
                   var id = newIdCount;
                   var title = ""
                   var customerName = customerData[userKey].firstname + " " + customerData[userKey].lastname
                   var service = "";
                   var commAction = customerData[userKey].contacthistory[commKey].follow 
                   var allDay = false;
                  
                   var resourceId = customerData[userKey].contacthistory[commKey].id;
                   const customerId = customerData[userKey].id;
                   var item = {}
                   item["id"] = id;
                   item["title"] = title;
                   item["allDay"] = allDay;
                   item["start"] = start;
                   item["end"] = end;
                   item["resourceId"] = resourceId;
                   item["backgroundColor"]= backgroundColor;
                   item["color"] = color;
                   item["ispast"] = isPast;
                   item["isnext"] = isNext;
                   item["customerId"] = customerId;
                   item["kind"]= "comm";
                   item["customerName"]= customerName;
                   item["service"]= service;
                   item["commAction"]= commAction;
                   jsonObj.push(item)
                 }
               }
             }
         }
     }
     return jsonObj  
}

export const GetAppointmentsCalendarFormat = (mode)=>{
    // const { t } = useTranslation();
      var jsonObj = [];
      var newIdCount =0;
      for (let userKey in customerData){
          if(customerData[userKey].appointments.length >=0){   
              for (let appoKey in customerData[userKey].appointments){
                  var backgroundColor = "dodgerblue";
                  var color = "white";
                  const start = new Date(customerData[userKey].appointments[appoKey].date)
                  const end = addMinutesToDate(start,Number(customerData[userKey].appointments[appoKey].duration));
                  var timeDif = Math.ceil(timeDifference(start) /(1000 * 3600 * 24)); //CONVERT TIMEDIFFERENCE TO DAYS
                  var isPast = false;
                  var isNext = false;
                  if (timeDif <= 0){
                      backgroundColor = "red";
                      color = "white"
                      isPast = true;
                  }
  
                  if (timeDif <=7 && timeDif>=0){
                      backgroundColor = "orange";
                      color = "white"
                      isNext = true;
                  }
  
                  // CONDICIONAL
                  if (!mode || (mode==="past" && isPast) || (mode==="next" && isNext)){
                    newIdCount = newIdCount +1;
                    var id = newIdCount;
                    var title ="";
                    var service =  getServiceNameById(customerData[userKey].appointments[appoKey].service);
                    var commAction = "";
                    var allDay = false;
                    var customerName = customerData[userKey].firstname + " " + customerData[userKey].lastname
                    var resourceId = customerData[userKey].appointments[appoKey].id;
                    const customerId = customerData[userKey].id;
  
                    var item = {}
                    item["id"] = id;
                    item["title"] = title;
                    item["allDay"] = allDay;
                    item["start"] = start;
                    item["end"] = end;
                    item["resourceId"] = resourceId;
                    item["backgroundColor"]= backgroundColor;
                    item["color"] = color;
                    item["ispast"] = isPast;
                    item["isnext"] = isNext;
                    item["customerId"] = customerId;
                    item["kind"]= "appo";
                    item["customerName"]= customerName;
                    item["service"]= service;
                    item["commAction"]= commAction;
                    jsonObj.push(item)
                  }
              }
          }
      }
      return jsonObj  
  }




//MODE: "pastdate","notanswered","allcal","pastcomm","nextcomm","allcomm","seeall"
export const GetAllItemsCalendarFormat= (mode)=>{
    var appoObj = [];
    var alerObj = [];
    
    switch (mode) {
      case "pastdate":
        appoObj= GetAppointmentsCalendarFormat("past");
        break;
      case "notanswered":
        appoObj= GetAppointmentsCalendarFormat("next");
        break;
      case "allcal":
        appoObj= GetAppointmentsCalendarFormat();
        break;
      case "pastcomm":
        alerObj = GetAlertsCalendarFormat("past");
        break;
      case "nextcomm":
        alerObj = GetAlertsCalendarFormat("next");
        break;
      case "allcomm":
        alerObj = GetAlertsCalendarFormat();
        break;
    
      default:
        appoObj = GetAppointmentsCalendarFormat();
        alerObj = GetAlertsCalendarFormat();
        break;
    }
     
    const merged = [...appoObj, ...alerObj];
    merged.forEach((el, index)=> el.id = index+1);
    return merged;
  } */