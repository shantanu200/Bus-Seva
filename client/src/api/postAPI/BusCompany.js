// POST API MODULE
import axios from "axios";

const url = `http://localhost:6969`;

export const CompanyData = (clientData) => {
    try {
        const response = axios.post(`${url}/busComp/postCompanyData`, clientData)
        return response.data;
    }catch(err){
        return err;
    }
};

export const registerCompanies = async () => {
    try{
        const response = await axios.get(`${url}/busComp/registerCompanies`);
        return response.data;
    }catch(err){
        return err;
    }
}

export const GetLogID = () => {
    try{
       const getLocalData = JSON.parse(window.localStorage.getItem("logUserData"));
       return getLocalData._id;
    }catch(error){
        return error;
    }
}