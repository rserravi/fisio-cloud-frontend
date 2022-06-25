
import ApiCalendar from "react-google-calendar-api"

const calendarID = "up7mnoaok2rcsa53nfj87vcd8k@group.calendar.google.com"
const secretICal = "https://calendar.google.com/calendar/ical/up7mnoaok2rcsa53nfj87vcd8k%40group.calendar.google.com/private-b70cb980b58461e02d81c17762f01db9/basic.ics"

export const calendarConfig = {
    "clientId": "313846874469-obgd355680bvg4a5csb434fd3lvkeqjk.apps.googleusercontent.com",
    "apiKey": "<AIzaSyBpuxcN5ITT-DpRQw8jeQ8YN2qbQDwpFzY>",
    "scope": "https://www.googleapis.com/auth/calendar",
    "discoveryDocs": [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
  }


export const apiCalendar = new ApiCalendar(config);
