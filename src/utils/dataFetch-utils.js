import customerData from "../assets/data/dummy-data.json"
import configData from "../assets/data/config-data.json"
import { addMinutesToDate, getWeekInYear, timeDifference } from "./date-utils";
import { useTranslation } from 'react-i18next';


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

export const getCustomerMailFromId=(_id)=>{
  let found = "";
    for (let key in customerData){
        if (customerData[key].email){
          for (let emailKey  in customerData[key].email){
            if(customerData[key].email[emailKey])
              found = customerData[key].email[emailKey].emailAddress;
              return found;
          }
        }
    }
    return found;
}

export const getCompanyData = ()=>{
  const data = {
    name: configData[0].company.name,
    logo: configData[0].company.logo,
    nifCif: configData[0].company.nifCif,
    type: configData[0].company.type,
    emailhome: configData[0].company.email[0].emailAddress,
    emailwork: configData[0].company.email[1].emailAddress,
    streetaddress: configData[0].company.address.streetAddress,
    city: configData[0].company.address.city,
    state: configData[0].company.address.state,
    postalCode: configData[0].company.address.postalCode,
    country: configData[0].company.address.country,
    homephone: configData[0].company.phoneNumber[0].number,
    mobilephone: configData[0].company.phoneNumber[1].number,
    whatsapp: configData[0].company.whatsapp,
    social1: configData[0].company.socialMedia[0].media,
    social2: configData[0].company.socialMedia[1].media,
    social3: configData[0].company.socialMedia[2].media,
    socialUser1:configData[0].company.socialMedia[0].user,
    socialUser2:configData[0].company.socialMedia[1].user,
    socialUser3:configData[0].company.socialMedia[2].user,
  }

  return (data);
}

export const GetCommunications = (props)=>{
  var jsonObj = [];
  var newIdCount =0;
  if (!props){
    for (let key in customerData){
      if (customerData[key].contacthistory){
        for (let histoKey in customerData[key].contacthistory){
          newIdCount = newIdCount + 1;
          var item = {};
          item["id"]= newIdCount;
          item["customerId"]= customerData[key].id;
          item["userId"]= customerData[key].contacthistory[histoKey].user;
          item["direction"]= customerData[key].contacthistory[histoKey].direction;
          item["communicationId"]= customerData[key].contacthistory[histoKey].id;
          item["date"] = customerData[key].contacthistory[histoKey].date;
          item["type"] =  customerData[key].contacthistory[histoKey].type;
          item["duration"] = customerData[key].contacthistory[histoKey].duration;
          item["subject"] =  customerData[key].contacthistory[histoKey].subject;
          item["notes"] =customerData[key].contacthistory[histoKey].notes;
          item["follow"] =customerData[key].contacthistory[histoKey].follow;
          item["thread"] = customerData[key].contacthistory[histoKey].thread;
          
          jsonObj.push(item)
        }
      }
    }
  }
  return jsonObj;
}

export const getUserList = (props) =>{
  return configData[0].user

}

export const getUserById = (_id) =>{
  let found = null;
  for (let key in configData[0].user){
    
      if (Number(configData[0].user[key].id) === Number(_id)){
          found = configData[0].user[key]
          break
      }
  }
  if (found){
  return found.firstname + " " + found.lastname;
  }
  else {
    return("error");
  }
}

export const getNewUsersId = ()=>{
  const lastId = configData[0].user[configData[0].user.length-1].id;
  return lastId+1;
  
}

export const getUserDataFromDb = (_id)=>{
  let found = null;
  var item = {
    isSubmited:false,
    isValidated: false,
    error: "",
    isEditing:false,
    isNew: true,
    firstname:"",
    lastname:"",
    image: "images/Portrait_Placeholder.png",
    birthdate: "",
    gender:"none",
    emailhome:"",
    emailwork:"",
    streetaddress: "",
    city:"",
    state:"",
    postalCode:"",
    country:"Spain",
    homephone:"",
    mobilephone:"+34",
    whatsapp:"+34",
    social1: "Facebook",
    social2: "Twitter",
    social3: "Instagram",
    socialUser1:"@",
    socialUser2:"@",
    socialUser3:"@",
    countryPhoneCode:"+34",
    locale:"es-ES",
    role:"user"
  }
  for (let key in configData[0].user){
    
      if (configData[0].user[key].id === _id){
          found = configData[0].user[key];
          break
      }
  }
  if (found){
  item ={
    isSubmited:false,
    isValidated: false,
    error: "",
    isEditing:false,
    isNew:false,
    firstname: found.firstname,
    lastname: found.lastname,
    image: found.image,
    birthdate: found.birhdate,
    gender: found.gender,
    emailhome: found.email[0].emailAddress,
    emailwork: found.email[1].emailAddress,
    streetaddress: found.address.streetAddress,
    city:found.address.city,
    state:found.address.state,
    postalCode:found.address.postalCode,
    country:found.address.country,
    homephone:found.phoneNumber[0].number,
    mobilephone:found.phoneNumber[1].number,
    whatsapp: found.whatsapp,
    social1: found.socialMedia[0].media,
    social2: found.socialMedia[1].media,
    social3: found.socialMedia[2].media,
    socialUser1:found.socialMedia[0].user,
    socialUser2:found.socialMedia[1].user,
    socialUser3:found.socialMedia[2].user,
    countryPhoneCode:"+34",
    locale:found.locales,
    role:found.role
  }
}

  
  return item;
}

export const getCustomerNameFromId = (_id) =>{
  let found = null;
  for (let key in customerData){
    
      if (customerData[key].id === _id){
          found = customerData[key];
          break
      }
  }
  if (found){
  return found.firstname + " " + found.lastname;
  }
  else {
    return("error");
  }
}

export const getCustomerList = () =>{
  var jsonObj = [];
  for (let userKey in customerData){
      var _id = customerData[userKey].id;
      var customerName = customerData[userKey].firstname + " " + customerData[userKey].lastname;

      var item = {}
      item["_id"] = _id;
      item["customerName"] = customerName;

      jsonObj.push(item)
  }
  return jsonObj;
}

export const getServices= () =>{
  return configData[0].services;
}

export const getPriceForService = (service)=>{
 var result = "0";
 for (let key in configData[0].services){
    if (configData[0].services[key].serviceName === service){
      result = configData[0].services[key].priceXHour;
      return result
    }
 }
 return result;
}

export const GetCustomerIdFromName = (name) =>{
  //TODO
  return 0
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
                var cabin = customerData[userKey].appointments[appoKey].cabin;
                var price = customerData[userKey].appointments[appoKey].price;
                var paid = customerData[userKey].appointments[appoKey].paid;
                var status = customerData[userKey].appointments[appoKey].status;
                var closed = customerData[userKey].appointments[appoKey].closed;
                var notes = customerData[userKey].appointments[appoKey].notes;
                var attachment = customerData[userKey].appointments[appoKey].attachment;
                var item = {}
                item["id"] = id;
                item["customerId"] = customerId;
                item["customerName"] = customerName;
                item["date"] = date;
                item["startingTime"] = startingTime;
                item["duration"] = duration;
                item["service"] = service;
                item["cabin"]= cabin;
                item["price"] = price;
                item["paid"] = paid;
                item["status"] = status;
                item["closed"] = closed;
                item["notes"] = notes;
                item["attachment"] = attachment;

                jsonObj.push(item)
            }
        }
    }
    return jsonObj  
}

export const GetAppointmentById = (props) =>{
  var jsonObj = [];
    for (let userKey in customerData){
      if (Number(customerData[userKey].id )=== Number(props.userId)){
        for (let appoKey in customerData[userKey].appointments){
          if (Number(customerData[userKey].appointments[appoKey].id) ===  Number(props.appoId)){
            var item = {}
                item["id"] = customerData[userKey].appointments[appoKey].id
                item["date"] =  customerData[userKey].appointments[appoKey].date;
                item["duration"] = customerData[userKey].appointments[appoKey].duration;
                item["service"] =  customerData[userKey].appointments[appoKey].service;
                item["cabin"]=   customerData[userKey].appointments[appoKey].cabin;
                item["price"] =customerData[userKey].appointments[appoKey].price;
                item["paid"] =customerData[userKey].appointments[appoKey].paid;
                item["status"] = customerData[userKey].appointments[appoKey].status;
                item["closed"] = customerData[userKey].appointments[appoKey].closed;
                item["notes"] = customerData[userKey].appointments[appoKey].notes;
                item["attachment"] = customerData[userKey].appointments[appoKey].attachment;

                jsonObj.push(item)
                return jsonObj  
          }
        }
      }
      }
    console.log(jsonObj)
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
                    backgroundColor = "red";
                    color = "white"
                    isPast = true;
                }

                if (dateWeek-thisWeek === 0){
                    backgroundColor = "orange";
                    color = "white"
                }
              

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
                item["customerId"] = customerId;
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
                accumulated = accumulated + Number(customerData[userKey].history[histoKey].paid)
               }
            }
        }
    }

    return accumulated;
}

export const GetDepositsArrayFromDate = (startdate, endDate, status) =>{

  var jsonObj = [];
  const start = new Date (startdate);
  const end = new Date (endDate);
  var counter = 0;

  for (let userKey in customerData){
      if(customerData[userKey].history.length >=0){
          for (let histoKey in customerData[userKey].history){   
             const eventDate = new Date(customerData[userKey].history[histoKey].date)
             if (customerData[userKey].history[histoKey].status===status && eventDate > start && eventDate < end ){
                var item = {};
                item["id"]= counter
                item["histoId"] = customerData[userKey].history[histoKey].id
                item["date"] =  customerData[userKey].history[histoKey].date;
                item["duration"] = customerData[userKey].history[histoKey].duration;
                item["service"] =  customerData[userKey].history[histoKey].service;
                item["price"] =customerData[userKey].history[histoKey].price;
                item["paid"] =customerData[userKey].history[histoKey].paid;
                item["status"] = customerData[userKey].history[histoKey].status;
                item["closed"] = customerData[userKey].history[histoKey].closed;
                item["notes"] = customerData[userKey].history[histoKey].notes;
                item["attachment"] = customerData[userKey].history[histoKey].attachment;
                item["customerId"] = customerData[userKey].id;
                item["periodStart"] = new Date (startdate).toISOString();
                item["periodEnd"] =  new Date (endDate).toISOString();
                
                jsonObj.push(item)
                counter = counter +1;
             }
          }
      }
  }
  return jsonObj;
}

export const GetDebtsToDate = (endDate) =>{

    const end = new Date (endDate)    
    var accumulated = 0;
    for (let userKey in customerData){
        if(customerData[userKey].history.length >=0){
            for (let histoKey in customerData[userKey].history){       
               const eventDate = new Date(customerData[userKey].history[histoKey].date)
               if (customerData[userKey].history[histoKey].status==="pending" && eventDate < end ){
                accumulated = accumulated + (Number(customerData[userKey].history[histoKey].price) -Number(customerData[userKey].history[histoKey].paid)) 
               }
            }
        }
    }

    return accumulated;
}

export const GetAllData = () =>{
  return customerData;
}

export const GetCabins = () =>{
  return configData[0].cabins
}

export const GetCabinNameById =(_id)=>{
  const data = configData[0].cabins;
  let found = null;
    for (let key in data){
        if (Number(data[key].id) === Number(_id)){
            found = data[key].localization;
            break
        }
    }
    return found +"";
}

export const GetSenderName = (customerId, userId, direction) =>{
  switch (direction) {
      case "send":
          return getCustomerNameFromId(customerId);
      case "receive":
          return getUserById(userId); 
  
      default:
          break;
  }
}

export const GetReceiverName = (customerId, userId, direction) =>{

  switch (direction) {
      case "receive":
          return getCustomerNameFromId(customerId);
      case "send":
          return getUserById(userId); 
      default:
          break;
  }
}

export const GetLocales = ()=>{
  return configData[0].user[0].locales;
}

export const GetRowById = (row,_id)=>{
  var found = {}
  for (let key in row){
    if (Number(row[key].id) === Number(_id)){
        found = row[key];
        break
    }
}
return found;
}

export const GetThread = (data)=>{
  const customerID = data.customerId;
  const thread = data.thread;
  var jsonObj = [];
  for (let key in customerData){
    if (Number(customerData[key].id) === Number(customerID)){
      for (let commKey in customerData[key].contacthistory){
        if (Number(customerData[key].contacthistory[commKey].thread) === Number(thread)){
          var item = {};
          item["id"]= customerData[key].contacthistory[commKey].id
          item["senderName"] = GetSenderName(customerData[key].id,  customerData[key].contacthistory[commKey].user, customerData[key].contacthistory[commKey].direction);
          item["receiverName"] =  GetReceiverName( customerData[key].id,  customerData[key].contacthistory[commKey].user,  customerData[key].contacthistory[commKey].direction);
          item["customerId"] = customerData[key].id
          item["userId"] =  customerData[key].contacthistory[commKey].user
          item["communicationId"] =customerData[key].contacthistory[commKey].id
          item["direction"] =customerData[key].contacthistory[commKey].direction;
          item["date"] = customerData[key].contacthistory[commKey].date;
          item["type"] = customerData[key].contacthistory[commKey].type;
          item["duration"] = customerData[key].contacthistory[commKey].duration;
          item["subject"] =customerData[key].contacthistory[commKey].subject;
          item["notes"] = customerData[key].contacthistory[commKey].notes;
          item["follow"] = customerData[key].contacthistory[commKey].follow;
          item["alertfollow"]= customerData[key].contacthistory[commKey].alertfollow;
          item["thread"] =  customerData[key].contacthistory[commKey].thread;
          
          jsonObj.push(item)
        }
      }
    }
  }
  return jsonObj.reverse();
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
export const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
      code: 'AE',
      label: 'United Arab Emirates',
      phone: '971',
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
      code: 'AG',
      label: 'Antigua and Barbuda',
      phone: '1-268',
    },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
    {
      code: 'AU',
      label: 'Australia',
      phone: '61',
      suggested: true,
    },
    { code: 'AW', label: 'Aruba', phone: '297' },
    { code: 'AX', label: 'Alland Islands', phone: '358' },
    { code: 'AZ', label: 'Azerbaijan', phone: '994' },
    {
      code: 'BA',
      label: 'Bosnia and Herzegovina',
      phone: '387',
    },
    { code: 'BB', label: 'Barbados', phone: '1-246' },
    { code: 'BD', label: 'Bangladesh', phone: '880' },
    { code: 'BE', label: 'Belgium', phone: '32' },
    { code: 'BF', label: 'Burkina Faso', phone: '226' },
    { code: 'BG', label: 'Bulgaria', phone: '359' },
    { code: 'BH', label: 'Bahrain', phone: '973' },
    { code: 'BI', label: 'Burundi', phone: '257' },
    { code: 'BJ', label: 'Benin', phone: '229' },
    { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
    { code: 'BM', label: 'Bermuda', phone: '1-441' },
    { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
    { code: 'BO', label: 'Bolivia', phone: '591' },
    { code: 'BR', label: 'Brazil', phone: '55' },
    { code: 'BS', label: 'Bahamas', phone: '1-242' },
    { code: 'BT', label: 'Bhutan', phone: '975' },
    { code: 'BV', label: 'Bouvet Island', phone: '47' },
    { code: 'BW', label: 'Botswana', phone: '267' },
    { code: 'BY', label: 'Belarus', phone: '375' },
    { code: 'BZ', label: 'Belize', phone: '501' },
    {
      code: 'CA',
      label: 'Canada',
      phone: '1',
      suggested: true,
    },
    {
      code: 'CC',
      label: 'Cocos (Keeling) Islands',
      phone: '61',
    },
    {
      code: 'CD',
      label: 'Congo, Democratic Republic of the',
      phone: '243',
    },
    {
      code: 'CF',
      label: 'Central African Republic',
      phone: '236',
    },
    {
      code: 'CG',
      label: 'Congo, Republic of the',
      phone: '242',
    },
    { code: 'CH', label: 'Switzerland', phone: '41' },
    { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
    { code: 'CK', label: 'Cook Islands', phone: '682' },
    { code: 'CL', label: 'Chile', phone: '56' },
    { code: 'CM', label: 'Cameroon', phone: '237' },
    { code: 'CN', label: 'China', phone: '86' },
    { code: 'CO', label: 'Colombia', phone: '57' },
    { code: 'CR', label: 'Costa Rica', phone: '506' },
    { code: 'CU', label: 'Cuba', phone: '53' },
    { code: 'CV', label: 'Cape Verde', phone: '238' },
    { code: 'CW', label: 'Curacao', phone: '599' },
    { code: 'CX', label: 'Christmas Island', phone: '61' },
    { code: 'CY', label: 'Cyprus', phone: '357' },
    { code: 'CZ', label: 'Czech Republic', phone: '420' },
    {
      code: 'DE',
      label: 'Germany',
      phone: '49',
      suggested: true,
    },
    { code: 'DJ', label: 'Djibouti', phone: '253' },
    { code: 'DK', label: 'Denmark', phone: '45' },
    { code: 'DM', label: 'Dominica', phone: '1-767' },
    {
      code: 'DO',
      label: 'Dominican Republic',
      phone: '1-809',
    },
    { code: 'DZ', label: 'Algeria', phone: '213' },
    { code: 'EC', label: 'Ecuador', phone: '593' },
    { code: 'EE', label: 'Estonia', phone: '372' },
    { code: 'EG', label: 'Egypt', phone: '20' },
    { code: 'EH', label: 'Western Sahara', phone: '212' },
    { code: 'ER', label: 'Eritrea', phone: '291' },
    { code: 'ES', label: 'Spain', phone: '34' },
    { code: 'ET', label: 'Ethiopia', phone: '251' },
    { code: 'FI', label: 'Finland', phone: '358' },
    { code: 'FJ', label: 'Fiji', phone: '679' },
    {
      code: 'FK',
      label: 'Falkland Islands (Malvinas)',
      phone: '500',
    },
    {
      code: 'FM',
      label: 'Micronesia, Federated States of',
      phone: '691',
    },
    { code: 'FO', label: 'Faroe Islands', phone: '298' },
    {
      code: 'FR',
      label: 'France',
      phone: '33',
      suggested: true,
    },
    { code: 'GA', label: 'Gabon', phone: '241' },
    { code: 'GB', label: 'United Kingdom', phone: '44' },
    { code: 'GD', label: 'Grenada', phone: '1-473' },
    { code: 'GE', label: 'Georgia', phone: '995' },
    { code: 'GF', label: 'French Guiana', phone: '594' },
    { code: 'GG', label: 'Guernsey', phone: '44' },
    { code: 'GH', label: 'Ghana', phone: '233' },
    { code: 'GI', label: 'Gibraltar', phone: '350' },
    { code: 'GL', label: 'Greenland', phone: '299' },
    { code: 'GM', label: 'Gambia', phone: '220' },
    { code: 'GN', label: 'Guinea', phone: '224' },
    { code: 'GP', label: 'Guadeloupe', phone: '590' },
    { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
    { code: 'GR', label: 'Greece', phone: '30' },
    {
      code: 'GS',
      label: 'South Georgia and the South Sandwich Islands',
      phone: '500',
    },
    { code: 'GT', label: 'Guatemala', phone: '502' },
    { code: 'GU', label: 'Guam', phone: '1-671' },
    { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
    { code: 'GY', label: 'Guyana', phone: '592' },
    { code: 'HK', label: 'Hong Kong', phone: '852' },
    {
      code: 'HM',
      label: 'Heard Island and McDonald Islands',
      phone: '672',
    },
    { code: 'HN', label: 'Honduras', phone: '504' },
    { code: 'HR', label: 'Croatia', phone: '385' },
    { code: 'HT', label: 'Haiti', phone: '509' },
    { code: 'HU', label: 'Hungary', phone: '36' },
    { code: 'ID', label: 'Indonesia', phone: '62' },
    { code: 'IE', label: 'Ireland', phone: '353' },
    { code: 'IL', label: 'Israel', phone: '972' },
    { code: 'IM', label: 'Isle of Man', phone: '44' },
    { code: 'IN', label: 'India', phone: '91' },
    {
      code: 'IO',
      label: 'British Indian Ocean Territory',
      phone: '246',
    },
    { code: 'IQ', label: 'Iraq', phone: '964' },
    {
      code: 'IR',
      label: 'Iran, Islamic Republic of',
      phone: '98',
    },
    { code: 'IS', label: 'Iceland', phone: '354' },
    { code: 'IT', label: 'Italy', phone: '39' },
    { code: 'JE', label: 'Jersey', phone: '44' },
    { code: 'JM', label: 'Jamaica', phone: '1-876' },
    { code: 'JO', label: 'Jordan', phone: '962' },
    {
      code: 'JP',
      label: 'Japan',
      phone: '81',
      suggested: true,
    },
    { code: 'KE', label: 'Kenya', phone: '254' },
    { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
    { code: 'KH', label: 'Cambodia', phone: '855' },
    { code: 'KI', label: 'Kiribati', phone: '686' },
    { code: 'KM', label: 'Comoros', phone: '269' },
    {
      code: 'KN',
      label: 'Saint Kitts and Nevis',
      phone: '1-869',
    },
    {
      code: 'KP',
      label: "Korea, Democratic People's Republic of",
      phone: '850',
    },
    { code: 'KR', label: 'Korea, Republic of', phone: '82' },
    { code: 'KW', label: 'Kuwait', phone: '965' },
    { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
    { code: 'KZ', label: 'Kazakhstan', phone: '7' },
    {
      code: 'LA',
      label: "Lao People's Democratic Republic",
      phone: '856',
    },
    { code: 'LB', label: 'Lebanon', phone: '961' },
    { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
    { code: 'LI', label: 'Liechtenstein', phone: '423' },
    { code: 'LK', label: 'Sri Lanka', phone: '94' },
    { code: 'LR', label: 'Liberia', phone: '231' },
    { code: 'LS', label: 'Lesotho', phone: '266' },
    { code: 'LT', label: 'Lithuania', phone: '370' },
    { code: 'LU', label: 'Luxembourg', phone: '352' },
    { code: 'LV', label: 'Latvia', phone: '371' },
    { code: 'LY', label: 'Libya', phone: '218' },
    { code: 'MA', label: 'Morocco', phone: '212' },
    { code: 'MC', label: 'Monaco', phone: '377' },
    {
      code: 'MD',
      label: 'Moldova, Republic of',
      phone: '373',
    },
    { code: 'ME', label: 'Montenegro', phone: '382' },
    {
      code: 'MF',
      label: 'Saint Martin (French part)',
      phone: '590',
    },
    { code: 'MG', label: 'Madagascar', phone: '261' },
    { code: 'MH', label: 'Marshall Islands', phone: '692' },
    {
      code: 'MK',
      label: 'Macedonia, the Former Yugoslav Republic of',
      phone: '389',
    },
    { code: 'ML', label: 'Mali', phone: '223' },
    { code: 'MM', label: 'Myanmar', phone: '95' },
    { code: 'MN', label: 'Mongolia', phone: '976' },
    { code: 'MO', label: 'Macao', phone: '853' },
    {
      code: 'MP',
      label: 'Northern Mariana Islands',
      phone: '1-670',
    },
    { code: 'MQ', label: 'Martinique', phone: '596' },
    { code: 'MR', label: 'Mauritania', phone: '222' },
    { code: 'MS', label: 'Montserrat', phone: '1-664' },
    { code: 'MT', label: 'Malta', phone: '356' },
    { code: 'MU', label: 'Mauritius', phone: '230' },
    { code: 'MV', label: 'Maldives', phone: '960' },
    { code: 'MW', label: 'Malawi', phone: '265' },
    { code: 'MX', label: 'Mexico', phone: '52' },
    { code: 'MY', label: 'Malaysia', phone: '60' },
    { code: 'MZ', label: 'Mozambique', phone: '258' },
    { code: 'NA', label: 'Namibia', phone: '264' },
    { code: 'NC', label: 'New Caledonia', phone: '687' },
    { code: 'NE', label: 'Niger', phone: '227' },
    { code: 'NF', label: 'Norfolk Island', phone: '672' },
    { code: 'NG', label: 'Nigeria', phone: '234' },
    { code: 'NI', label: 'Nicaragua', phone: '505' },
    { code: 'NL', label: 'Netherlands', phone: '31' },
    { code: 'NO', label: 'Norway', phone: '47' },
    { code: 'NP', label: 'Nepal', phone: '977' },
    { code: 'NR', label: 'Nauru', phone: '674' },
    { code: 'NU', label: 'Niue', phone: '683' },
    { code: 'NZ', label: 'New Zealand', phone: '64' },
    { code: 'OM', label: 'Oman', phone: '968' },
    { code: 'PA', label: 'Panama', phone: '507' },
    { code: 'PE', label: 'Peru', phone: '51' },
    { code: 'PF', label: 'French Polynesia', phone: '689' },
    { code: 'PG', label: 'Papua New Guinea', phone: '675' },
    { code: 'PH', label: 'Philippines', phone: '63' },
    { code: 'PK', label: 'Pakistan', phone: '92' },
    { code: 'PL', label: 'Poland', phone: '48' },
    {
      code: 'PM',
      label: 'Saint Pierre and Miquelon',
      phone: '508',
    },
    { code: 'PN', label: 'Pitcairn', phone: '870' },
    { code: 'PR', label: 'Puerto Rico', phone: '1' },
    {
      code: 'PS',
      label: 'Palestine, State of',
      phone: '970',
    },
    { code: 'PT', label: 'Portugal', phone: '351' },
    { code: 'PW', label: 'Palau', phone: '680' },
    { code: 'PY', label: 'Paraguay', phone: '595' },
    { code: 'QA', label: 'Qatar', phone: '974' },
    { code: 'RE', label: 'Reunion', phone: '262' },
    { code: 'RO', label: 'Romania', phone: '40' },
    { code: 'RS', label: 'Serbia', phone: '381' },
    { code: 'RU', label: 'Russian Federation', phone: '7' },
    { code: 'RW', label: 'Rwanda', phone: '250' },
    { code: 'SA', label: 'Saudi Arabia', phone: '966' },
    { code: 'SB', label: 'Solomon Islands', phone: '677' },
    { code: 'SC', label: 'Seychelles', phone: '248' },
    { code: 'SD', label: 'Sudan', phone: '249' },
    { code: 'SE', label: 'Sweden', phone: '46' },
    { code: 'SG', label: 'Singapore', phone: '65' },
    { code: 'SH', label: 'Saint Helena', phone: '290' },
    { code: 'SI', label: 'Slovenia', phone: '386' },
    {
      code: 'SJ',
      label: 'Svalbard and Jan Mayen',
      phone: '47',
    },
    { code: 'SK', label: 'Slovakia', phone: '421' },
    { code: 'SL', label: 'Sierra Leone', phone: '232' },
    { code: 'SM', label: 'San Marino', phone: '378' },
    { code: 'SN', label: 'Senegal', phone: '221' },
    { code: 'SO', label: 'Somalia', phone: '252' },
    { code: 'SR', label: 'Suriname', phone: '597' },
    { code: 'SS', label: 'South Sudan', phone: '211' },
    {
      code: 'ST',
      label: 'Sao Tome and Principe',
      phone: '239',
    },
    { code: 'SV', label: 'El Salvador', phone: '503' },
    {
      code: 'SX',
      label: 'Sint Maarten (Dutch part)',
      phone: '1-721',
    },
    {
      code: 'SY',
      label: 'Syrian Arab Republic',
      phone: '963',
    },
    { code: 'SZ', label: 'Swaziland', phone: '268' },
    {
      code: 'TC',
      label: 'Turks and Caicos Islands',
      phone: '1-649',
    },
    { code: 'TD', label: 'Chad', phone: '235' },
    {
      code: 'TF',
      label: 'French Southern Territories',
      phone: '262',
    },
    { code: 'TG', label: 'Togo', phone: '228' },
    { code: 'TH', label: 'Thailand', phone: '66' },
    { code: 'TJ', label: 'Tajikistan', phone: '992' },
    { code: 'TK', label: 'Tokelau', phone: '690' },
    { code: 'TL', label: 'Timor-Leste', phone: '670' },
    { code: 'TM', label: 'Turkmenistan', phone: '993' },
    { code: 'TN', label: 'Tunisia', phone: '216' },
    { code: 'TO', label: 'Tonga', phone: '676' },
    { code: 'TR', label: 'Turkey', phone: '90' },
    {
      code: 'TT',
      label: 'Trinidad and Tobago',
      phone: '1-868',
    },
    { code: 'TV', label: 'Tuvalu', phone: '688' },
    {
      code: 'TW',
      label: 'Taiwan, Province of China',
      phone: '886',
    },
    {
      code: 'TZ',
      label: 'United Republic of Tanzania',
      phone: '255',
    },
    { code: 'UA', label: 'Ukraine', phone: '380' },
    { code: 'UG', label: 'Uganda', phone: '256' },
    {
      code: 'US',
      label: 'United States',
      phone: '1',
      suggested: true,
    },
    { code: 'UY', label: 'Uruguay', phone: '598' },
    { code: 'UZ', label: 'Uzbekistan', phone: '998' },
    {
      code: 'VA',
      label: 'Holy See (Vatican City State)',
      phone: '379',
    },
    {
      code: 'VC',
      label: 'Saint Vincent and the Grenadines',
      phone: '1-784',
    },
    { code: 'VE', label: 'Venezuela', phone: '58' },
    {
      code: 'VG',
      label: 'British Virgin Islands',
      phone: '1-284',
    },
    {
      code: 'VI',
      label: 'US Virgin Islands',
      phone: '1-340',
    },
    { code: 'VN', label: 'Vietnam', phone: '84' },
    { code: 'VU', label: 'Vanuatu', phone: '678' },
    { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
    { code: 'WS', label: 'Samoa', phone: '685' },
    { code: 'XK', label: 'Kosovo', phone: '383' },
    { code: 'YE', label: 'Yemen', phone: '967' },
    { code: 'YT', label: 'Mayotte', phone: '262' },
    { code: 'ZA', label: 'South Africa', phone: '27' },
    { code: 'ZM', label: 'Zambia', phone: '260' },
    { code: 'ZW', label: 'Zimbabwe', phone: '263' },
  ];