import customerData from "../assets/data/dummy-data.json"
import { addMinutesToDate, getWeekInYear, timeDifference } from "./date-utils";

export const getCustomer = (_id) =>{
    let found = null;
    for (let key in customerData){
      
        if (customerData[key].id === _id){
            found = customerData[key];
            break
        }
    }
    return found;
}

export const firstItemId = ()=>{
    return customerData[0].id;
}

export const lastItemId = () =>{
    return customerData[customerData.length -1].id;
}

export const GetAppointments = ()=>{
    var jsonObj = [];
    var newIdCount =0;
    for (let userKey in customerData){
        if(customerData[userKey].appointments.length >=0){
            for (let appoKey in customerData[userKey].appointments){
                newIdCount = newIdCount +1;
                var id = newIdCount;
                var customerId = customerData[userKey].id;
                var customerName = customerData[userKey].firstname + " " + customerData[userKey].lastname;
                var date = customerData[userKey].appointments[appoKey].date;
                var startingTime = customerData[userKey].appointments[appoKey].startingTime;
                var duration = customerData[userKey].appointments[appoKey].duration;
                var service = customerData[userKey].appointments[appoKey].service;
                var price = customerData[userKey].appointments[appoKey].price;
                var status = customerData[userKey].appointments[appoKey].status;
                var closed = customerData[userKey].appointments[appoKey].closed;
                var notes = customerData[userKey].appointments[appoKey].notes;

                var item = {}
                item["id"] = id;
                item["customerId"] = customerId;
                item["customerName"] = customerName;
                item["date"] = date;
                item["startingTime"] = startingTime;
                item["duration"] = duration;
                item["service"] = service;
                item["price"] = price;
                item["status"] = status;
                item["closed"] = closed;
                item["notes"] = notes;

                jsonObj.push(item)
            }
        }
    }
    return jsonObj  
}

export const GetAppointmentsCalendarFormat = ()=>{
    var jsonObj = [];
    var newIdCount =0;
    for (let userKey in customerData){
        if(customerData[userKey].appointments.length >=0){
            for (let appoKey in customerData[userKey].appointments){
                newIdCount = newIdCount +1;
                var id = newIdCount;
                var title = customerData[userKey].firstname + " " + customerData[userKey].lastname + " para " + customerData[userKey].appointments[appoKey].service 
                var allDay = false;
                const start = new Date(customerData[userKey].appointments[appoKey].date)
                const end = addMinutesToDate(start,Number(customerData[userKey].appointments[appoKey].duration));
                var backgroundColor = "dodgerblue";
                var color = "white";
                var isPast = false;
                const thisWeek = getWeekInYear(Date.now());
                const dateWeek = getWeekInYear(start);
                if (timeDifference(start) <= 0){
                    var backgroundColor = "red";
                    var color = "white"
                    isPast = true;
                }

                if (dateWeek-thisWeek === 0){
                    var backgroundColor = "orange";
                    var color = "white"
                }
              

                var resourceId = 1;
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
                jsonObj.push(item)
            }
        }
    }
    return jsonObj  
}

export const GetDepositsFromDate = (startdate, endDate) =>{
    const start = new Date (startdate);
    const end = new Date (endDate)    

    var accumulated = 0;
    for (let userKey in customerData){
        if(customerData[userKey].history.length >=0){
            for (let histoKey in customerData[userKey].history){
                
               const eventDate = new Date(customerData[userKey].history[histoKey].date)
               if (customerData[userKey].history[histoKey].status==="paid" && eventDate > start && eventDate < end ){
                accumulated = accumulated + Number(customerData[userKey].history[histoKey].price)
               }
            }
        }
    }

    return accumulated;
}

export const GetDebtsToDate = (endDate) =>{

    const end = new Date (endDate)    
    var accumulated = 0;
    for (let userKey in customerData){
        if(customerData[userKey].history.length >=0){
            for (let histoKey in customerData[userKey].history){       
               const eventDate = new Date(customerData[userKey].history[histoKey].date)
               if (customerData[userKey].history[histoKey].status==="pending" && eventDate < end ){
                accumulated = accumulated + Number(customerData[userKey].history[histoKey].price)
               }
            }
        }
    }

    return accumulated;
}