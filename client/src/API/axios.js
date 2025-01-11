import axios from 'axios';
//const BASE_URL='http://172.29.50.69:3500'
//const BASE_URL='http://172.31.73.1:3500/'
//Sanskar1751978@
//const BASE_URL='http://127.0.0.1:3500/'
const BASE_URL='http://localhost:8000'
//const BASE_URL='https://r-m-n-p.azurewebsites.net'

//axios.defaults.withCredentials = true;
export default axios.create({
    baseURL: BASE_URL,
   withCredentials: true
});
export const axiosPrivate= axios.create({
    baseURL: BASE_URL,
    headers:{'Content-Type':'application/json'},
    withCredentials: true
});