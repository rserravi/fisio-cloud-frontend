import PropTypes from 'prop-types';

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

export function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

export function toLocalDate2(date) {
  console.log (typeof(date));
  const result = new Date(date).toLocaleDateString();
  return result;
}

export const timeDifference = (date) => {
  const date1 = new Date (date);
  const elapsedTime = date1 - Date.now();
  return elapsedTime;
   
}

export const getDateFromISOTime = (date) =>{
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date1 = new Date (date);
  const strDate = date1.toLocaleDateString(undefined,options);
  return strDate;
}

export const getTimeFromISOTime = (date) =>{
  const date1 = new Date (date);
  const strDate = date1.toLocaleTimeString(undefined, {hour12:false, hour: '2-digit', minute: '2-digit' });
  return strDate;
}

export const getWeeKDay = (date) =>{
  const date1 = new Date (date);
  return date1.toLocaleDateString();
}

export const getWeekInYear = (date) =>{
  const currentdate = new Date(date);
  const oneJan = new Date(currentdate.getFullYear(),0,1);
  const numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  const answer = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
  return (answer);
}

export const addMinutesToDate = (date, minutes)=>{

  var oldDate = new Date();
  if (typeof(date)==="string"){
    oldDate = new Date(date)
  }
  else{
    if (date._isAMomentObject){
      oldDate = date._d;
    }
  }
  if (Object.prototype.toString.call(date) === '[object Date]'  ){
    oldDate = date;
  }
  var newd = new Date(date);
  newd.setMinutes(oldDate.getMinutes()+Number(minutes));
  return newd
}

export const addMonthtoDate= (date, months) =>{
  var oldDate = new Date()
  var newd = new Date(date);
  newd.setMonth(oldDate.getMonth()+Number(months));
  return newd
}

addMinutesToDate.propTypes = {
  date: PropTypes.Date,
  minutes: PropTypes.number
}