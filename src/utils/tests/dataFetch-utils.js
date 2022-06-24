import { $CombinedState } from "@reduxjs/toolkit";
import customerData from "../../assets/data/dummy-data.json"

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
                item ["id"] = id;
                item ["customerId"] = customerId;
                item ["customerName"] = customerName;
                item ["date"] = date;
                item ["startingTime"] = startingTime;
                item ["duration"] = duration;
                item ["service"] = service;
                item ["price"] = price;
                item ["status"] = status;
                item ["closed"] = closed;
                item ["notes"] = notes;

                jsonObj.push(item)
            }
        }
    }
    return jsonObj
    

}