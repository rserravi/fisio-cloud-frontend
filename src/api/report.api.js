import axios from "axios";
import i18next from 'i18next';

const rootUrl = "http://localhost:3001/v1";
const calendarUrl = rootUrl + "/calendar";
const bellAlertsUrl = calendarUrl + "/alerts"