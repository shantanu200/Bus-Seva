import axios from "axios";
import { useJsApiLoader } from "@react-google-maps/api";

export const getUserData = () => {
  let data = window.localStorage.getItem("LogUser");
  return JSON.parse(data);
};

export const signOut = () => {
  window.localStorage.removeItem("LogUser");
};

export const getCompUserData = () => {
  let data = window.localStorage.getItem("compLogUser");
  return JSON.parse(data);
}

export const companyUser = JSON.parse(window.localStorage.getItem("compLogUser"));

