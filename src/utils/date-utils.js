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